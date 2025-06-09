import { Body, Controller, Post } from '@nestjs/common'

import {
  LoginRequestDto,
  LoginResponseDto,
  RefreshTokenRequestDto,
  RefreshTokenResponseDto,
  MeResponseDto,
  RegisterRequestDto,
} from './auth.dto'
import { plainToInstance } from 'class-transformer'
import { AuthService } from '@app/auth'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.authService.validateUser(body.email, body.password)
    const result = await this.authService.login(user)
    return plainToInstance(LoginResponseDto, result, { ignoreDecorators: true })
  }

  @Post('register')
  async register(@Body() body: RegisterRequestDto): Promise<LoginResponseDto> {
    const result = await this.authService.register(body)
    return plainToInstance(LoginResponseDto, result, { ignoreDecorators: true })
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
