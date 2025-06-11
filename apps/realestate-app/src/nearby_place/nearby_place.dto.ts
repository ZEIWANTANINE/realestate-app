import { MEDIA_TYPE, PLACE_TYPE } from '@app/common'
import { Expose, Type } from 'class-transformer'
import {
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  IsPositive,
  IsDecimal,
  IsInt,
  IsDate,
} from 'class-validator'
export class CreateNearbyPlaceDto {
  @Expose()
    @IsInt()
  property_id: number

    @Expose()
    @IsOptional()
    @IsEnum(PLACE_TYPE)
  place_type?: PLACE_TYPE

    @Expose()
    @IsOptional()
    @IsString()
  name?: string

    @Expose()
    @IsString()
    @IsOptional()
  address?: string

    @Expose()
    @IsNumber()
    @IsOptional()
  latitude?: number

  @Expose()
    @IsNumber()
    @IsOptional()
  longitude?: number

  @Expose()
    @IsNumber()
    @IsOptional()
  distance?: number

  @Expose()
    @IsString()
    @IsOptional()
  icon_url?: string
}

export class UpdateNearbyPlaceDto {
   @Expose()
    @IsInt()
  property_id: number

    @Expose()
    @IsOptional()
    @IsEnum(PLACE_TYPE)
  place_type?: PLACE_TYPE

    @Expose()
    @IsOptional()
    @IsString()
  name?: string

    @Expose()
    @IsString()
    @IsOptional()
  address?: string
  
    @Expose()
    @IsNumber()
    @IsOptional()
  latitude?: number

  @Expose()
    @IsNumber()
    @IsOptional()
  longitude?: number

  @Expose()
    @IsNumber()
    @IsOptional()
  distance?: number

  @Expose()
    @IsString()
    @IsOptional()
  icon_url?: string
}

export class NearbyPlaceResponseDto {
  @Expose()
  id: number

   @Expose()
  property_id: number

    @Expose()
  place_type?: PLACE_TYPE

    @Expose()
  name?: string

    @Expose()
  address?: string
  
    @Expose()
  latitude?: number

  @Expose()
  longitude?: number

  @Expose()
  distance?: number

  @Expose()
  icon_url?: string

  @Expose()
  created_at: Date

  @Expose()
  updated_at: Date

    @Expose()
  deleted_at?: Date
}

export class ListNearbyPlaceRequestDto {
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