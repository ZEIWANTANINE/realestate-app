import { USER_ROLE } from '@app/auth'
import { Expose } from 'class-transformer'
import {
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  IsPositive,
} from 'class-validator'

export class CreateUserDto {
  @Expose()
  @IsString()
  email: string

  @Expose()
  @IsOptional()
  @IsString()
  password?: string

  @Expose()
  @IsEnum(USER_ROLE)
  role: USER_ROLE
}

export class UpdateUserDto {
  @Expose()
  @IsOptional()
  @IsString()
  email?: string

  @Expose()
  @IsOptional()
  @IsString()
  password?: string

  @Expose()
  @IsOptional()
  @IsEnum(USER_ROLE)
  role?: USER_ROLE
}

export class UserResponseDto {
  @Expose()
  id: number

  @Expose()
  email: string

  @Expose()
  role: USER_ROLE

  @Expose()
  created_at: Date

  @Expose()
  updated_at: Date
}

export class ListUserRequestDto {
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