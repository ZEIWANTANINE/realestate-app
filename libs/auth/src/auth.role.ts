import { ForbiddenException, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { USER_ROLE, AUTH_ADMIN_ROLES_KEY } from './auth.const'

export function validateUserRoleAccess(
  reflector: Reflector,
  context: ExecutionContext,
  userRole: USER_ROLE,
) {
  const requiredRoles = reflector.getAllAndOverride<USER_ROLE[]>(
    AUTH_ADMIN_ROLES_KEY,
    [context.getHandler(), context.getClass()],
  )

  if (!requiredRoles || requiredRoles.length === 0) return

  if (!requiredRoles.includes(userRole)) {
    throw new ForbiddenException('You do not have access to this resource')
  }
}
