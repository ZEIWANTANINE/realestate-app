import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common'
import {
  LoginRequestDto,
  LoginResponseDto,
  RefreshTokenRequestDto,
  RefreshTokenResponseDto,
  RegisterRequestDto,
  UpdateAgentProfileDto,
  UpdateBuyerProfileDto,
  UpdateProfileResponseDto,
} from './auth.dto'
import { plainToInstance } from 'class-transformer'
import { AuthService } from '@app/auth'
import { AgentProfilesRepository } from '@app/database/repositories/agent_profiles.repository'
import { BuyerProfilesRepository } from '@app/database/repositories/buyer_profiles.repository'
import { AgentProfilesEntity, BuyerProfilesEntity } from '@app/database'
import { Auth, CurrentUser } from '@app/auth/auth.decorator'
import { USER_ROLE } from '@app/auth'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly agentProfilesRepository: AgentProfilesRepository,
    private readonly buyerProfilesRepository: BuyerProfilesRepository,
  ) {}

  @Post('login')
  async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
    // Validate user credentials
    const user = await this.authService.validateUser(body.email, body.password)
    
    // Get user profile based on role
    let agent_profile: AgentProfilesEntity | null = null
    let buyer_profile: BuyerProfilesEntity | null = null

    if (user.role === 'AGENT') {
      agent_profile = await this.agentProfilesRepository.findByUserId(user.id)
    } else if (user.role === 'BUYER') {
      buyer_profile = await this.buyerProfilesRepository.findByUserId(user.id)
    }

    // Generate tokens
    const result = await this.authService.login(user)
     console.log('Access Token:', result.accessToken)
  console.log('Refresh Token:', result.refreshToken)
    // Transform and return response
    return plainToInstance(LoginResponseDto, {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        agent_profile,
        buyer_profile,
      },
      access_token: result.accessToken,
      refresh_token: result.refreshToken,
    }, { excludeExtraneousValues: true })
  }

  @Post('register')
  async register(@Body() body: RegisterRequestDto): Promise<LoginResponseDto> {
    // Register new user
    const result = await this.authService.register(body)

    // Get user profile based on role
    let agent_profile: AgentProfilesEntity | null = null
    let buyer_profile: BuyerProfilesEntity | null = null

    if (result.user.role === 'AGENT') {
      agent_profile = await this.agentProfilesRepository.findByUserId(result.user.sub)
    } else if (result.user.role === 'BUYER') {
      buyer_profile = await this.buyerProfilesRepository.findByUserId(result.user.sub)
    }

    // Transform and return response
    return plainToInstance(LoginResponseDto, {
      user: {
        id: result.user.sub,
        email: result.user.email,
        role: result.user.role,
        agent_profile,
        buyer_profile,
      },
      access_token: result.accessToken,
      refresh_token: result.refreshToken,
    }, { excludeExtraneousValues: true })
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() body: RefreshTokenRequestDto,
  ): Promise<RefreshTokenResponseDto> {
    const result = await this.authService.refreshAccessToken(body.refreshToken)
    return plainToInstance(RefreshTokenResponseDto, {
      access_token: result.accessToken,
    }, { excludeExtraneousValues: true })
  }

  @Put('profile')
  @Auth(USER_ROLE.AGENT, USER_ROLE.BUYER)
  async updateProfile(
    @CurrentUser() user: any,
    @Body() body: UpdateAgentProfileDto | UpdateBuyerProfileDto,
  ): Promise<UpdateProfileResponseDto> {
    const result = await this.authService.updateProfile(user.sub, user.role, body)
    return plainToInstance(UpdateProfileResponseDto, {
      user: result,
    }, { excludeExtraneousValues: true })
  }
}