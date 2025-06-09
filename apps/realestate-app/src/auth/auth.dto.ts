
import { USER_ROLE } from '@app/auth'
import { GENDER } from '@app/common'
import { Expose, Type } from 'class-transformer'
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator'


export class InfoLoginDto {
  @Expose()
  id: number

  @Expose()
  name: string

  @Expose()
  email: string

  @Expose()
  phone: string


  @Expose()
  role: string

  @Expose()
  organization_id: number

}
export class LoginRequestDto {
  @IsNotEmpty()
  @Expose()
  @IsString()
  email: string

  @IsNotEmpty()
  @Expose()
  @IsString()
  @MinLength(6)
  password: string
}

export class RegisterRequestDto {
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
  @IsString()
  password: string

  @Expose()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  organization_id?: number

  @Expose()
  @IsOptional()
  @IsString()
  code: string

  @Expose()
  @IsOptional()
  @IsString()
  level: string

  @Expose()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  hour_target: number
}

export class RefreshTokenRequestDto {
  @IsNotEmpty()
  @Expose({ name: 'refresh_token' })
  refreshToken: string
}

export class LoginResponseDto {
  @Expose({ name: 'user' })
  @Type(()=>InfoLoginDto)
  user: InfoLoginDto

  @Expose({ name: 'access_token' })
  accessToken: string

  @Expose({ name: 'refresh_token' })
  refreshToken: string
}

export class RefreshTokenResponseDto {
  @Expose({ name: 'access_token' })
  accessToken: string
}


export class MeResponseDto {
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
  role: string

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
