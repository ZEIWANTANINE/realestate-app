import { Body, Controller, Post } from '@nestjs/common'
import {
  LoginRequestDto,
  LoginResponseDto,
  RefreshTokenRequestDto,
  RefreshTokenResponseDto,
  RegisterRequestDto,
} from './auth.dto'
import { plainToInstance } from 'class-transformer'
import { AuthService } from '@app/auth'
import { AgentProfilesRepository } from '@app/database/repositories/agent_profiles.repository'
import { BuyerProfilesRepository } from '@app/database/repositories/buyer_profiles.repository'
import { AgentProfilesEntity, BuyerProfilesEntity } from '@app/database'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly agentProfilesRepository: AgentProfilesRepository,
    private readonly buyerProfilesRepository: BuyerProfilesRepository,
  ) {}

  @Post('login')
  async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.authService.validateUser(body.email, body.password)
    const result = await this.authService.login(user)

    // Lấy profile theo role
    let agent_profile: import('@app/database/entities/agent_profiles.entity').AgentProfilesEntity | null = null
    let buyer_profile: import('@app/database/entities/buyer_profiles.entity').BuyerProfilesEntity | null = null

    if (user.role === 'AGENT') {
      agent_profile = await this.agentProfilesRepository.findByUserId(user.id)
    }
    if (user.role === 'BUYER') {
      buyer_profile = await this.buyerProfilesRepository.findByUserId(user.id)
    }

    return plainToInstance(LoginResponseDto, {
      ...result,
      user: {
        ...result.user,
        agent_profile,
        buyer_profile,
      },
    }, { ignoreDecorators: true })
  }

  @Post('register')
  async register(@Body() body: RegisterRequestDto): Promise<LoginResponseDto> {
    const result = await this.authService.register(body)

    // Lấy profile theo role sau khi đăng ký
    let agent_profile: AgentProfilesEntity | null = null
    let buyer_profile: BuyerProfilesEntity | null = null

    if (result.user.role === 'AGENT') {
      agent_profile = await this.agentProfilesRepository.findByUserId(result.user.sub)
    }
    if (result.user.role === 'BUYER') {
      buyer_profile = await this.buyerProfilesRepository.findByUserId(result.user.sub)
    }

    return plainToInstance(LoginResponseDto, {
      ...result,
      user: {
        ...result.user,
        agent_profile,
        buyer_profile,
      },
    }, { ignoreDecorators: true })
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() body: RefreshTokenRequestDto,
  ): Promise<RefreshTokenResponseDto> {
    const result = await this.authService.refreshAccessToken(body.refreshToken)
    return plainToInstance(RefreshTokenResponseDto, result, {
      excludeExtraneousValues: true,
    })
  }
}