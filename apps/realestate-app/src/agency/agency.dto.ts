import { USER_ROLE } from '@app/auth'
import { Expose } from 'class-transformer'
import {
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  IsPositive,
} from 'class-validator'

export class CreateAgencyDto {
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
  logo_url?: string

  @Expose()
  @IsOptional()
  @IsString()
  website?: string

  @Expose()
  @IsOptional()
  @IsString()
  address?: string
}

export class UpdateAgencyDto {
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
  logo_url?: string

  @Expose()
  @IsOptional()
  @IsString()
  website?: string

  @Expose()
  @IsOptional()
  @IsString()
  address?: string
}

export class AgencyResponseDto {
  @Expose()
  id: number

  @Expose()
  name: string

  @Expose()
  phone?: string

  @Expose()
  logo_url?: string

  @Expose()
  website?: string

  @Expose()
  address?: string

  @Expose()
  created_at: Date

  @Expose()
  updated_at: Date

  @Expose()
  deleted_at?: Date

}

export class ListAgencyRequestDto {
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