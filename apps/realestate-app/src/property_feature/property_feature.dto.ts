import { COOL, HEAT } from '@app/common/common.const'
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
  IsBoolean,
} from 'class-validator'
export class CreatePropertyFeatureDto {
  @Expose()
    @IsInt()
  property_id: number

    @Expose()
    @IsOptional()
    @IsEnum(HEAT)
  heating_type?: HEAT

    @Expose()
    @IsOptional()
    @IsEnum(COOL)
  cooling_type?: COOL

    @Expose()
    @IsBoolean()
    @IsOptional()
  furnished?: boolean
}

export class UpdatePropertyFeatureDto {
   @Expose()
    @IsInt()
  property_id: number

    @Expose()
    @IsOptional()
    @IsEnum(HEAT)
  heating_type?: HEAT

    @Expose()
    @IsOptional()
    @IsEnum(COOL)
  cooling_type?: COOL

    @Expose()
    @IsBoolean()
    @IsOptional()
  furnished?: boolean
}

export class PropertyFeatureResponseDto {
  @Expose()
  id: number

   @Expose()
  property_id: number

    @Expose()
  heating_type?: HEAT

    @Expose()
  cooling_type?: COOL

    @Expose()
  furnished?: boolean

  @Expose()
  created_at: Date

  @Expose()
  updated_at: Date

    @Expose()
  deleted_at?: Date
}

export class ListPropertyFeatureRequestDto {
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