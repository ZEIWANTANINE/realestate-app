import {
  createParamDecorator,
  ExecutionContext,
  applyDecorators,
  UseGuards,
  SetMetadata,
} from '@nestjs/common'
import { JwtAuthGuard } from './auth.guard'
import { AUTH_ADMIN_ROLES_KEY, USER_ROLE } from './auth.const'

export function Auth(...roles: USER_ROLE[]) {
  return applyDecorators(
    SetMetadata(AUTH_ADMIN_ROLES_KEY, roles),
    UseGuards(JwtAuthGuard),
  )
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  },
)
