import { USER_ROLE } from '@app/auth'
import { GENDER } from '@app/common'
import { Expose, Type } from 'class-transformer'
import {
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  IsPositive,
} from 'class-validator'

export class OrganizationInfoDto {
  @Expose()
  id: number

  @Expose()
  name: string

  @Expose()
  description: string
}

export class CreateUserDto {
  @Expose()
  @IsString()
  name: string

  @Expose()
  @IsString()
  email: string

  @Expose()
  @IsString()
  phone: string

  @Expose()
  @IsEnum(GENDER)
  gender: GENDER

  @Expose()
  @IsOptional()
  @IsString()
  password?: string

  @Expose()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  organization_id?: number

  // @Expose()
  // @IsOptional()
  // @IsNumber()
  // @Type(() => Number)
  // role_id?: number

  @Expose()
  @IsEnum(USER_ROLE)
  role: USER_ROLE

  @Expose()
  @IsOptional()
  @IsString()
  code?: string

  @Expose()
  @IsOptional()
  @IsString()
  level?: string

  @Expose()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  hour_target?: number
}

export class UpdateUserDto {
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
  @IsEnum(GENDER)
  gender?: GENDER

  @Expose()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  organization_id?: number

  // @Expose()
  // @IsOptional()
  // @IsNumber()
  // @Type(() => Number)
  // role_id?: number

  @Expose()
  @IsEnum(USER_ROLE)
  @IsOptional()
  role?: USER_ROLE

  @Expose()
  @IsOptional()
  @IsString()
  code?: string

  @Expose()
  @IsOptional()
  @IsString()
  level?: string

  @Expose()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  hour_target?: number
}

export class UserResponseDto {
  @Expose()
  id: number

  @Expose()
  name: string

  @Expose()
  email: string

  @Expose()
  phone: string

  @Expose()
  gender: GENDER

  @Expose()
  organization_id?: number

  @Expose()
  @Type(() => OrganizationInfoDto)
  organization: OrganizationInfoDto

  // @Expose()
  // role_id: number
  @Expose()
  role?: USER_ROLE

  @Expose()
  code: string

  @Expose()
  level: string

  @Expose()
  hour_target: number

  @Expose()
  created_at: Date

  @Expose()
  updated_at: Date
}
export class ListUserRequestDto {
  //todo: add filter

  @Expose({ name: 'page' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  page: number

  @Expose({ name: 'size' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  size: number

  @Expose({ name: 'key' })
  @Type(() => String)
  @IsString()
  @IsOptional()
  key: string

  @Expose({ name: 'status' })
  @Type(() => String)
  @IsString()
  @IsOptional()
  status: string

  @Expose({ name: 'organization_id' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  organization_id: number
}
