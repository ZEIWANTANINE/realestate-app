import { UserEntity, UserRepository } from '@app/database';
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

    if (!data.password_hash) {
      throw new BadRequestException('Password is required');
    }
    const hashedPassword = await bcrypt.hash(data.password_hash, 10)

    const created = await this.userRepository.create({
      ...data,
      role: USER_ROLE.USER,
      password: hashedPassword,
    })

    const payload: LoginPayload = {
      sub: created.id,
      email: created.email,
      role: created.role,
    }

    const token = this.jwtService.sign(payload)
    return { accessToken: token, user: payload }
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
