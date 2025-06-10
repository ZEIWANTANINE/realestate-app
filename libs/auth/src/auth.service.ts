import { AgentProfilesRepository, BuyerProfilesRepository, UserEntity, UserRepository } from '@app/database';
import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ICreateInfo, LoginPayload } from './auth.interface';
import { ADMIN_EXCEPTIONS, USER_ROLE } from './auth.const';

@Injectable()
export class AuthService {
    constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly agentProfilesRepository: AgentProfilesRepository,
    private readonly buyerProfilesRepository: BuyerProfilesRepository,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findUserActiveForLogin(email)
    if (user && (await bcrypt.compare(password, user.password))) {
      return user
    }
    throw new BadRequestException(ADMIN_EXCEPTIONS.INVALID_CREDENTIALS)
  }

  async login(user: UserEntity) {
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
    return { user, accessToken, refreshToken }
  }

  async register(data: ICreateInfo) {
    const existing = await this.userRepository.findByEmail(data.email)
    if (existing) throw new BadRequestException('Email already registered')

    if (!data.password) {
      throw new BadRequestException('Password is required');
    }
    if (!data.role) {
      throw new BadRequestException('Role is required');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const created = await this.userRepository.create({
      email: data.email,
      password: hashedPassword,
      role: data.role,
    })

    // Tạo profile theo role
    if (created.role === USER_ROLE.AGENT) {
      await this.agentProfilesRepository.create({
        user_id: created.id,
        name: created.email,
      })
    }
    if (created.role === USER_ROLE.BUYER) {
      await this.buyerProfilesRepository.create({
        user_id: created.id,
        name: created.email,
      })
    }

    const payload: LoginPayload = {
      sub: created.id,
      email: created.email,
      role: created.role,
    }

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('auth.accessTokenExpire'),
    })
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('auth.refreshTokenExpire'),
    })

    return { user: payload, accessToken, refreshToken }
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload: LoginPayload = this.jwtService.verify(refreshToken)
      const newAccessToken = this.jwtService.sign(payload, {
        expiresIn: this.configService.get('auth.accessTokenExpire'),
      })
      return { accessToken: newAccessToken }
    } catch {
      throw new BadRequestException(ADMIN_EXCEPTIONS.INVALID_REFRESH_TOKEN)
    }
  }
}
