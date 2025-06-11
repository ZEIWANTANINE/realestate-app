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
export class CreateFavouriteDto {
    @Expose()
    @IsInt()
  user_id: number

  @Expose()
    @IsInt()
  property_id: number
}

export class UpdateFavouriteDto {
  @Expose()
    @IsInt()
  user_id: number

  @Expose()
    @IsInt()
  property_id: number
}

export class FavoutireResponseDto {
  @Expose()
  id: number

  @Expose()
    @IsInt()
  user_id: number

  @Expose()
    @IsInt()
  property_id: number

  @Expose()
  created_at: Date

  @Expose()
  updated_at: Date

    @Expose()
  deleted_at?: Date
}

export class ListFavoutireRequestDto {
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

  @Expose()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  user_id?: number // Added user_id

  @Expose()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  property_id?: number // Added property_id
}