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
export class UserInfoDto {
    
}
export class CreateBuyerProfilesDto {
  @Expose()
  @IsNumber()
  user_id: number

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
  prefered_location?: string
}

export class UpdateBuyerProfilesDto {

    @Expose()
  @IsNumber()
  user_id: number
  
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
  prefered_location?: string
}

export class BuyerProfilesResponseDto {
  @Expose()
  id: number

  @Expose()
  user_id: number

  @Expose()
  name: string

  @Expose()
  phone?: string

  @Expose()
  avatar_url?: string

  @Expose()
  prefered_location?: string

  @Expose()
  created_at: Date

  @Expose()
  updated_at: Date
}

export class ListBuyerProfilesRequestDto {
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