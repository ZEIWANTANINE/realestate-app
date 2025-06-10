import { USER_ROLE } from '@app/auth'
import { Expose, Type } from 'class-transformer'
import {
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  IsPositive,
  IsDecimal,
  IsInt,
} from 'class-validator'
import { DeleteDateColumn } from 'typeorm'
export class CreateCompanyDto {
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
  industry?: string

  @Expose()
  @IsOptional()
  @IsString()
  email?: string

  @Expose()
  @IsOptional()
  @IsString()
  address?: string

  @Expose()
  @IsOptional()
  @IsString()
  description?: string

  @Expose()
  @IsOptional()
  @IsString()
  website?: string
}

export class UpdateCompanyDto {
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
  industry?: string

  @Expose()
  @IsOptional()
  @IsString()
  email?: string

  @Expose()
  @IsOptional()
  @IsString()
  address?: string

  @Expose()
  @IsOptional()
  @IsString()
  description?: string

  @Expose()
  @IsOptional()
  @IsString()
  website?: string
}

export class CompanyResponseDto {
  @Expose()
  id: number

  @Expose()
  name: string

  @Expose()
  phone?: string

  @Expose()
  logo_url?: string

  @Expose()
  industry?: string

  @Expose()
  email?: string

  @Expose()
  address?: string

  @Expose()
  description?: string

  @Expose()
  website?: string

  @Expose()
  created_at: Date

  @Expose()
  updated_at: Date

    @Expose()
  deleted_at?: Date
}

export class ListCompanyRequestDto {
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