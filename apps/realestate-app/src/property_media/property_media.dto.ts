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
export class CreatePropertyMediaDto {
  @Expose()
    @IsInt()
  property_id: number

    @Expose()
        @IsOptional()
        @IsDate()
  media_type?: string

    @Expose()
        @IsOptional()
        @IsDate()
  media_url?: string

    @Expose()
    @IsString()
    @IsOptional()
  caption?: string
}

export class UpdatePropertyMediaDto {
   @Expose()
    @IsInt()
  property_id: number

    @Expose()
        @IsOptional()
        @IsDate()
  media_type?: string

    @Expose()
        @IsOptional()
        @IsDate()
  media_url?: string

    @Expose()
    @IsString()
    @IsOptional()
  caption?: string
}

export class PropertyMediaResponseDto {
  @Expose()
  id: number

   @Expose()
  property_id: number

    @Expose()
  media_type?: string

    @Expose()
  media_url?: string

    @Expose()
  caption?: string

  @Expose()
  created_at: Date

  @Expose()
  updated_at: Date

    @Expose()
  deleted_at?: Date
}

export class ListPropertyMediaRequestDto {
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
  property_id?: number 
}