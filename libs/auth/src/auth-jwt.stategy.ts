import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AUTH_ADMIN_NAME } from './auth.const'
import { LoginPayload } from './auth.interface'
import * as dotenv from 'dotenv'

dotenv.config()
@Injectable()
export class JwtUserStrategy extends PassportStrategy(
  Strategy,
  AUTH_ADMIN_NAME,
) {
  constructor() {
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      throw new Error('JWT_SECRET environment variable is not defined')
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
      ignoreExpiration: false,
    })
  }

  validate(payload: LoginPayload) {
    return payload
  }
}
