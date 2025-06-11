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
  IsBoolean
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
  @Type(() => Number)
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
  zipcode?: string

  @Expose()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  latitude?: number

  @Expose()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  longtitude?: number

  @Expose()
  @IsOptional()
  @IsString()
  property_type?: string

  @Expose()
  @IsOptional()
    @Type(() => Number)
  @IsInt()
  bedrooms?: number

  @Expose()
  @IsOptional()
    @Type(() => Number)
  @IsInt()
  bathrooms?: number

  @Expose()
  @IsOptional()
    @Type(() => Number)
  @IsDecimal()
  area_size?: number

  @Expose()
  @IsOptional()
    @Type(() => Number)
  @IsInt()
  year_built?: number

  @Expose()
  @IsOptional()
    @Type(() => Number)
  @IsInt()
  floors?: number

  @Expose()
  @IsOptional()
    @Type(() => Number)
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
  @Type(() => Number)
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
  zipcode?: string

  @Expose()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  latitude?: number

  @Expose()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  longtitude?: number

  @Expose()
  @IsOptional()
  @IsString()
  property_type?: string

  @Expose()
  @IsOptional()
    @Type(() => Number)
  @IsInt()
  bedrooms?: number

  @Expose()
  @IsOptional()
    @Type(() => Number)
  @IsInt()
  bathrooms?: number

  @Expose()
  @IsOptional()
    @Type(() => Number)
  @IsDecimal()
  area_size?: number

  @Expose()
  @IsOptional()
    @Type(() => Number)
  @IsInt()
  year_built?: number

  @Expose()
  @IsOptional()
    @Type(() => Number)
  @IsInt()
  floors?: number

  @Expose()
  @IsOptional()
    @Type(() => Number)
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
  zipcode?: string

  @Expose()
  latitude?: number

  @Expose()
  longtitude?: number

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