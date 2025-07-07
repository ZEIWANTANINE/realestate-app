import { USER_ROLE } from '@app/auth'
import { GENDER } from '@app/common'
import { Expose, Type } from 'class-transformer'
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator'
import { BuyerProfilesResponseDto } from '../buyer_profiles/buyer_profiles.dto'
import { AgentProfilesResponseDto } from '../agent_profiles/agent_profiles.dto'

export class AgentProfileDto {
  @Expose() id: number
  @Expose() name: string
  // ... các trường khác của agent_profiles ...
}

export class BuyerProfileDto {
  @Expose() id: number
  @Expose() name: string
  // ... các trường khác của buyer_profiles ...
}

export class InfoLoginDto {
  @Expose() id: number
  @Expose() email: string
  @Expose() role: string

  @Expose()
  @Type(() => AgentProfilesResponseDto)
  agent_profile?: AgentProfilesResponseDto

  @Expose()
  @Type(() => BuyerProfilesResponseDto)
  buyer_profile?: BuyerProfilesResponseDto
}

export class LoginRequestDto {
  @IsNotEmpty()
  @Expose()
  @IsString()
  email: string

  @IsNotEmpty()
  @Expose()
  @IsString()
  @MinLength(6)
  password: string
}

export class RegisterRequestDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  email: string

  @IsString()
  @IsNotEmpty()
  @Expose()
  @MinLength(6)
  password: string

  @IsEnum(USER_ROLE, {
    message: 'Role must be either BUYER or AGENT'
  })
  @IsNotEmpty()
  @Expose()
  role: USER_ROLE

  @IsString()
  @IsOptional()
  @Expose()
  name?: string
}

export class RefreshTokenRequestDto {
  @IsNotEmpty()
  @Expose({ name: 'refresh_token' })
  refreshToken: string
}

export class LoginResponseDto {
  @Expose({ name: 'user' })
  @Type(()=>InfoLoginDto)
  user: InfoLoginDto

  @Expose({ name: 'access_token' })
  accessToken: string

  @Expose({ name: 'refresh_token' })
  refreshToken: string
}

export class RefreshTokenResponseDto {
  @Expose({ name: 'access_token' })
  accessToken: string
}

export class MeResponseDto {
  @Expose()
  id: number

  @Expose()
  email: string

  @Expose()
  password: string

  @Expose()
  role: USER_ROLE

  @Expose()
  created_at: Date

  @Expose()
  updated_at: Date
}

export class UpdateUserProfileDto {
  @IsString()
  @IsOptional()
  @Expose()
  name?: string

  @IsString()
  @IsOptional()
  @Expose()
  phone?: string

  @IsString()
  @IsOptional()
  @Expose()
  address?: string

  @IsEnum(GENDER, {
    message: 'Gender must be either MALE or FEMALE'
  })
  @IsOptional()
  @Expose()
  gender?: GENDER

  @IsString()
  @IsOptional()
  @Expose()
  avatar?: string
}

export class UpdateAgentProfileDto extends UpdateUserProfileDto {
  @IsString()
  @IsOptional()
  @Expose()
  company_name?: string

  @IsString()
  @IsOptional()
  @Expose()
  license_number?: string

  @IsString()
  @IsOptional()
  @Expose()
  experience?: string
}

export class UpdateBuyerProfileDto extends UpdateUserProfileDto {
  @IsString()
  @IsOptional()
  @Expose()
  preferred_location?: string

  @IsNumber()
  @IsOptional()
  @Expose()
  budget_min?: number

  @IsNumber()
  @IsOptional()
  @Expose()
  budget_max?: number
}

export class UpdateProfileResponseDto {
  @Expose()
  @Type(() => InfoLoginDto)
  user: InfoLoginDto
}
