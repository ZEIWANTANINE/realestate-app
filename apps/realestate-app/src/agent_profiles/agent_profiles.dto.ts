import { USER_ROLE } from '@app/auth'
import { Expose } from 'class-transformer'
import {
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  IsPositive,
} from 'class-validator'

export class CreateAgentProfilesDto {
  @Expose()
  @IsNumber()
  user_id: number

  @Expose()
  @IsNumber()
  agency_id: number

  @Expose()
  @IsString()
  name: string

  @Expose()
  @IsOptional()
  @IsString()
  phone?: string

  @Expose()
  @IsOptional()
  @IsString()
  avatar_url?: string

  @Expose()
  @IsOptional()
  @IsString()
  license_number?: string

  @Expose()
  @IsOptional()
  @IsNumber()
  rating?: number
}

export class UpdateAgentProfilesDto {
    @Expose()
  @IsNumber()
  user_id: number

  @Expose()
  @IsNumber()
  agency_id: number

  @Expose()
  @IsOptional()
  @IsString()
  name?: string

  @Expose()
  @IsOptional()
  @IsString()
  phone?: string

  @Expose()
  @IsOptional()
  @IsString()
  avatar_url?: string

  @Expose()
  @IsOptional()
  @IsString()
  license_number?: string

  @Expose()
  @IsOptional()
  @IsNumber()
  rating?: number
}

export class AgentProfilesResponseDto {
  @Expose()
  id: number

  @Expose()
  user_id: number
  
    @Expose()
  agent_id: number

  @Expose()
  name: string

  @Expose()
  phone?: string

  @Expose()
  avatar_url?: string

  @Expose()
  license_number?: string

  @Expose()
  rating?: number

  @Expose()
  created_at: Date

  @Expose()
  updated_at: Date
}

export class ListUserRequestDto {
  @Expose({ name: 'page' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  page?: number

  @Expose({ name: 'size' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  size?: number

  @Expose({ name: 'key' })
  @IsOptional()
  @IsString()
  key?: string
}