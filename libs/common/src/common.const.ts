import { USER_ROLE } from '@app/auth'


export const VALIDATION_ERROR = {
  code: '1000',
  message: 'VALIDATION_ERROR',
}

export const VALIDATION_MESSAGE_API_PREFIX = 'API'

export const UserRoleLabels: Record<USER_ROLE, string> = {
  [USER_ROLE.ADMIN]: 'Quản trị hệ thống',
  [USER_ROLE.AGENT]: 'Đơn vị quản lý',
  [USER_ROLE.BUYER]: 'Trưởng đơn vị',
}
export enum GENDER {
  MALE = 'male',
  FEMALE = 'female',
}
export enum STATUS{
  Pending = 'pending',
  Confirmed = 'confirmed',
  Canceled = 'canceled',
}

export const DEFAULT_PAGE_SIZE = 10
export const DEFAULT_PAGE = 1

export const DEFAULT_PASSWORD = '123456'
