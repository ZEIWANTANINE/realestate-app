import { USER_ROLE } from '@app/auth'
import { Expose } from 'class-transformer'
import {
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  IsPositive,
} from 'class-validator'

export class CreateNewDto {
  @Expose()
  @IsString()
  title: string

  @Expose()
  @IsOptional()
  @IsString()
  content?: string

  @Expose()
  @IsOptional()
  @IsString()
  thumbnail_url?: string

  @Expose()
  @IsOptional()
  @IsString()
  source_url?: string

  @Expose()
  @IsOptional()
  published_at?: Date

    @Expose()
  @IsOptional()
  @IsString()
  tags?:string
}

export class UpdateNewDto {
  @Expose()
  @IsString()
  title: string

  @Expose()
  @IsOptional()
  @IsString()
  content?: string

  @Expose()
  @IsOptional()
  @IsString()
  thumbnail_url?: string

  @Expose()
  @IsOptional()
  @IsString()
  source_url?: string

  @Expose()
  @IsOptional()
  @IsString()
  published_at?: Date
  
    @Expose()
  @IsOptional()
  @IsString()
  tags?:string
}

export class NewResponseDto {
  @Expose()
  id: number

  @Expose()
  title: string

  @Expose()
  content?: string

  @Expose()
  thumbnail_url?: string

  @Expose()
  source_url?: string

  @Expose()
  published_at?: Date
  
    @Expose()
  tags?:string

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
}