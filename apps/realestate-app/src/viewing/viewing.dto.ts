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
export class CreateViewingDto {
    @Expose()
    @IsInt()
  buyer_id: number

  @Expose()
    @IsInt()
  property_id: number

    @Expose()
        @IsOptional()
        @IsDate()
  schedule_date?: Date

    @Expose()
    @IsEnum(STATUS)
  status?: STATUS
}

export class UpdateViewingDto {
   @Expose()
    @IsInt()
  buyer_id: number

  @Expose()
    @IsInt()
  property_id: number
  
    @Expose()
        @IsOptional()
        @IsDate()
  schedule_date?: Date

    @Expose()
    @IsEnum(STATUS)
  status?: STATUS
}

export class ViewingResponseDto {
  @Expose()
  id: number

   @Expose()
  buyer_id: number

  @Expose()
  property_id: number
  
    @Expose()
  schedule_date?: Date

    @Expose()
  status?: STATUS

  @Expose()
  created_at: Date

  @Expose()
  updated_at: Date

    @Expose()
  deleted_at?: Date
}

export class ListViewingRequestDto {
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
  buyer_id?: number // Added user_id

  @Expose()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  property_id?: number // Added property_id

  @Expose()
  @IsOptional()
  @IsString()
  status?: STATUS // Added status filter
}