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
import { isFloat32Array } from 'util/types'

export class CreatePropertyDto {
    @Expose()
    @IsOptional()
  @IsInt()
  agent_id: number

    @Expose()
    @IsOptional()
  @IsInt()
  company_id: number

  @Expose()
  @IsOptional()
  @IsString()
  title?: string

  @Expose()
  @IsOptional()
  @IsString()
  description?: string

  @Expose()
  @IsOptional()
  @IsDecimal()
  price?: number

  @Expose()
  @IsOptional()
  @IsString()
  address?: string

  @Expose()
  @IsOptional()
  @IsString()
  city?: string

  @Expose()
  @IsOptional()
  @IsString()
  state?: string

  @Expose()
  @IsOptional()
  @IsString()
  country?: string

  @Expose()
  @IsOptional()
  @IsString()
  zip_code?: string

  @Expose()
  @IsOptional()
  @IsInt()
  latitude?: number

  @Expose()
  @IsOptional()
  @IsInt()
  longitude?: number

  @Expose()
  @IsOptional()
  @IsString()
  property_type?: string

  @Expose()
  @IsOptional()
  @IsInt()
  bedrooms?: number

  @Expose()
  @IsOptional()
  @IsInt()
  bathrooms?: number

  @Expose()
  @IsOptional()
  @IsDecimal()
  area_size?: number

  @Expose()
  @IsOptional()
  @IsInt()
  year_built?: number

  @Expose()
  @IsOptional()
  @IsInt()
  floors?: number

  @Expose()
  @IsOptional()
  @IsInt()
  parking_spaces?: number

  @Expose()
  @IsOptional()
  is_active?: boolean
}

export class UpdatePropertyDto {

    @Expose()
    @IsOptional()
  @IsInt()
  agent_id: number

    @Expose()
    @IsOptional()
  @IsInt()
  company_id: number

  @Expose()
  @IsOptional()
  @IsString()
  title?: string

  @Expose()
  @IsOptional()
  @IsString()
  description?: string

  @Expose()
  @IsOptional()
  @IsDecimal()
  price?: number

  @Expose()
  @IsOptional()
  @IsString()
  address?: string

  @Expose()
  @IsOptional()
  @IsString()
  city?: string

  @Expose()
  @IsOptional()
  @IsString()
  state?: string

  @Expose()
  @IsOptional()
  @IsString()
  country?: string

  @Expose()
  @IsOptional()
  @IsString()
  zip_code?: string

  @Expose()
  @IsOptional()
  @IsInt()
  latitude?: number

  @Expose()
  @IsOptional()
  @IsInt()
  longitude?: number

  @Expose()
  @IsOptional()
  @IsString()
  property_type?: string

  @Expose()
  @IsOptional()
  @IsInt()
  bedrooms?: number

  @Expose()
  @IsOptional()
  @IsInt()
  bathrooms?: number

  @Expose()
  @IsOptional()
  @IsDecimal()
  area_size?: number

  @Expose()
  @IsOptional()
  @IsInt()
  year_built?: number

  @Expose()
  @IsOptional()
  @IsInt()
  floors?: number

  @Expose()
  @IsOptional()
  @IsInt()
  parking_spaces?: number

  @Expose()
  @IsOptional()
  is_active?: boolean
}

export class PropertyResponseDto {
  @Expose()
  id: number

  @Expose()
  agent_id: number

  @Expose()
  company_id: number

  @Expose()
  title?: string

  @Expose()
  description?: string

  @Expose()
  price?: number

  @Expose()
  address?: string

  @Expose()
  city?: string

  @Expose()
  state?: string

  @Expose()
  country?: string

  @Expose()
  zip_code?: string

  @Expose()
  latitude?: number

  @Expose()
  longitude?: number

  @Expose()
  property_type?: string

  @Expose()
  bedrooms?: number

  @Expose()
  bathrooms?: number

  @Expose()
  area_size?: number

  @Expose()
  year_built?: number

  @Expose()
  floors?: number

  @Expose()
  parking_spaces?: number

  @Expose()
  is_active?: boolean

  @Expose()
  created_at: Date

  @Expose()
  updated_at: Date

  @Expose()
  deleted_at?: Date

}

export class ListNewRequestDto {
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

  @Expose({ name: 'agent_id' })
    @Type(() => Number)
    @IsOptional()
    agent_id: number
  
    @Expose({ name: 'company_id' })
    @Type(() => Number)
    @IsOptional()
    company_id: number
}