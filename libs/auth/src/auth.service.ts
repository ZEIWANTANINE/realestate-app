import { AgentProfilesRepository, BuyerProfilesRepository, UserEntity, UserRepository, AgentProfilesEntity, BuyerProfilesEntity } from '@app/database';
import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ICreateInfo, LoginPayload } from './auth.interface';
import { ADMIN_EXCEPTIONS, USER_ROLE } from './auth.const';
import { GENDER } from '@app/common';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly agentProfilesRepository: AgentProfilesRepository,
    private readonly buyerProfilesRepository: BuyerProfilesRepository,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    try {
      this.logger.debug(`Validating user: ${email}`);
      
      if (!email || !password) {
        throw new BadRequestException('Email and password are required');
      }

      const user = await this.userRepository.findUserActiveForLogin(email)
      
      if (!user) {
        this.logger.warn(`User not found: ${email}`);
        throw new BadRequestException('User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        this.logger.warn(`Invalid password for user: ${email}`);
        throw new BadRequestException('Invalid password');
      }

      this.logger.debug(`User validated successfully: ${email}`);
      return user
    } catch (error) {
      this.logger.error(`Error validating user: ${error.message}`, error.stack);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(ADMIN_EXCEPTIONS.INVALID_CREDENTIALS);
    }
  }

  async login(user: UserEntity) {
    try {
      this.logger.debug(`Logging in user: ${user.email}`);
      
      const payload: LoginPayload = {
        sub: user.id,
        email: user.email,
        role: user.role,
      }

      const accessToken = this.jwtService.sign(payload, {
        expiresIn: this.configService.get('auth.accessTokenExpire'),
      })

      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: this.configService.get('auth.refreshTokenExpire'),
      })

      this.logger.debug(`Login successful for user: ${user.email}`);
      return { user, accessToken, refreshToken }
    } catch (error) {
      this.logger.error(`Error during login: ${error.message}`, error.stack);
      throw new BadRequestException('Login failed');
    }
  }

  async register(data: ICreateInfo) {
    try {
      this.logger.debug(`[Register] Starting registration process for email: ${data.email}`);

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        this.logger.error(`[Register] Invalid email format: ${data.email}`);
        throw new BadRequestException('Invalid email format');
      }

      // Check if user already exists
      this.logger.debug(`[Register] Checking if user exists: ${data.email}`);
      const existing = await this.userRepository.findByEmail(data.email);
      if (existing) {
        this.logger.warn(`[Register] Email already registered: ${data.email}`);
        throw new BadRequestException('Email already registered');
      }

      // Validate password
      if (!data.password) {
        this.logger.error('[Register] Password is missing');
        throw new BadRequestException('Password is required');
      }
      if (data.password.length < 6) {
        this.logger.error('[Register] Password too short');
        throw new BadRequestException('Password must be at least 6 characters long');
      }

      // Validate role
      if (!data.role) {
        this.logger.error('[Register] Role is missing');
        throw new BadRequestException('Role is required');
      }
      if (!Object.values(USER_ROLE).includes(data.role)) {
        this.logger.error(`[Register] Invalid role: ${data.role}`);
        throw new BadRequestException('Role must be either BUYER or AGENT');
      }

      // Hash password
      this.logger.debug('[Register] Hashing password');
      const hashedPassword = await bcrypt.hash(data.password, 10);

      // Create new user
      this.logger.debug(`[Register] Creating new user: ${data.email}`);
      const created = await this.userRepository.create({
        email: data.email,
        password: hashedPassword,
        role: data.role,
      });
      this.logger.debug(`[Register] User created with ID: ${created.id}`);

      // Create profile based on role
      const profileName = data.name || data.email;
      if (created.role === USER_ROLE.AGENT) {
        this.logger.debug(`[Register] Creating agent profile for user: ${created.id}`);
        await this.agentProfilesRepository.create({
          user_id: created.id,
          name: profileName,
          phone: '',
        });
      }
      if (created.role === USER_ROLE.BUYER) {
        this.logger.debug(`[Register] Creating buyer profile for user: ${created.id}`);
        await this.buyerProfilesRepository.create({
          user_id: created.id,
          name: profileName,
          phone: '',
        });
      }

      // Generate tokens
      this.logger.debug(`[Register] Generating tokens for user: ${created.id}`);
      const payload: LoginPayload = {
        sub: created.id,
        email: created.email,
        role: created.role,
      };

      const accessToken = this.jwtService.sign(payload, {
        expiresIn: this.configService.get('auth.accessTokenExpire'),
      });
      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: this.configService.get('auth.refreshTokenExpire'),
      });

      this.logger.debug(`[Register] Registration completed successfully for user: ${data.email}`);
      return { user: payload, accessToken, refreshToken };
    } catch (error) {
      this.logger.error(`[Register] Error during registration: ${error.message}`, error.stack);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Registration failed: ' + error.message);
    }
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      this.logger.debug('Attempting to refresh access token');
      
      if (!refreshToken) {
        throw new BadRequestException('Refresh token is required');
      }

      const payload: LoginPayload = this.jwtService.verify(refreshToken)
      const newAccessToken = this.jwtService.sign(payload, {
        expiresIn: this.configService.get('auth.accessTokenExpire'),
      })

      this.logger.debug('Access token refreshed successfully');
      return { accessToken: newAccessToken }
    } catch (error) {
      this.logger.error(`Error refreshing token: ${error.message}`, error.stack);
      throw new BadRequestException(ADMIN_EXCEPTIONS.INVALID_REFRESH_TOKEN)
    }
  }

  async updateProfile(userId: number, role: USER_ROLE, data: any) {
    try {
      this.logger.debug(`[UpdateProfile] Starting profile update for user: ${userId}`);

      // Update user information
      const userUpdateData = {
        name: data.name,
        phone: data.phone,
        address: data.address,
        gender: data.gender,
        avatar: data.avatar,
      } as Partial<UserEntity>;

      await this.userRepository.update(userId, userUpdateData);

      // Update role-specific profile
      if (role === USER_ROLE.AGENT) {
        const agentProfileData = {
          company_name: data.company_name,
          license_number: data.license_number,
          experience: data.experience,
        } as Partial<AgentProfilesEntity>;
        await this.agentProfilesRepository.update(userId, agentProfileData);
      } else if (role === USER_ROLE.BUYER) {
        const buyerProfileData = {
          preferred_location: data.preferred_location,
          budget_min: data.budget_min,
          budget_max: data.budget_max,
        } as Partial<BuyerProfilesEntity>;
        await this.buyerProfilesRepository.update(userId, buyerProfileData);
      }

      // Get updated user with profile
      const updatedUser = await this.userRepository.findById(userId);
      if (!updatedUser) {
        throw new BadRequestException('User not found');
      }

      let agent_profile: AgentProfilesEntity | null = null;
      let buyer_profile: BuyerProfilesEntity | null = null;

      if (role === USER_ROLE.AGENT) {
        agent_profile = await this.agentProfilesRepository.findByUserId(userId);
      } else if (role === USER_ROLE.BUYER) {
        buyer_profile = await this.buyerProfilesRepository.findByUserId(userId);
      }

      this.logger.debug(`[UpdateProfile] Profile updated successfully for user: ${userId}`);
      return {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
        agent_profile,
        buyer_profile,
      };
    } catch (error) {
      this.logger.error(`[UpdateProfile] Error updating profile: ${error.message}`, error.stack);
      throw new BadRequestException('Failed to update profile: ' + error.message);
    }
  }
}
