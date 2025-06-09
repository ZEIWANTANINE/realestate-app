import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ADMIN_EXCEPTIONS, AUTH_ADMIN_NAME } from './auth.const'
import { validateUserRoleAccess } from './auth.role'
import { Reflector } from '@nestjs/core'

@Injectable()
export class JwtAuthGuard extends AuthGuard(AUTH_ADMIN_NAME) {
  constructor(private reflector: Reflector) {
    super()
  }

  handleRequest(err, user, info, context) {
    const request = context.switchToHttp().getRequest()
    if (err || !user) {
      if (info && info.name === 'TokenExpiredError') {
        throw new UnauthorizedException(ADMIN_EXCEPTIONS.ACCESS_TOKEN_EXPIRE)
      }
      throw (
        err || new UnauthorizedException(ADMIN_EXCEPTIONS.INVALID_ACCESS_TOKEN)
      )
    }

    request.user = user
    validateUserRoleAccess(this.reflector, context, user.role)
    return user
  }
}
