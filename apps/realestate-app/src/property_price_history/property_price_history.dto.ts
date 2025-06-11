import { STATUS } from '@app/common/common.const'
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
export class CreatePropertyPriceHistoryDto {
  @Expose()
    @IsInt()
  property_id: number

    @Expose()
        @IsOptional()
        @IsDate()
  recored_at?: Date

    @Expose()
    @IsDecimal()
    @IsOptional()
  price?: number
}

export class UpdatePropertyPriceHistoryDto {
   @Expose()
    @IsInt()
  property_id: number

    @Expose()
        @IsOptional()
        @IsDate()
  recored_at?: Date

    @Expose()
    @IsDecimal()
    @IsOptional()
  price?: number
}

export class PropertyPriceHistoryResponseDto {
  @Expose()
  id: number

   @Expose()
  property_id: number

    @Expose()
  recored_at?: Date

    @Expose()
  price?: number

  @Expose()
  created_at: Date

  @Expose()
  updated_at: Date

    @Expose()
  deleted_at?: Date
}

export class ListPropertyPriceHistoryRequestDto {
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