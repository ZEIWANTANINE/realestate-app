import { USER_ROLE } from '@app/auth'


export const VALIDATION_ERROR = {
  code: '1000',
  message: 'VALIDATION_ERROR',
}

export const VALIDATION_MESSAGE_API_PREFIX = 'API'

export const UserRoleLabels: Record<USER_ROLE, string> = {
  [USER_ROLE.SYSTEM_ADMIN]: 'Quản trị hệ thống',
  [USER_ROLE.MANAGING_UNIT]: 'Đơn vị quản lý',
  [USER_ROLE.HEAD_OF_UNIT]: 'Trưởng đơn vị',
  [USER_ROLE.DATA_ENTRY]: 'Người điền dữ liệu',
  [USER_ROLE.USER]: 'Người dùng',
}
export enum GENDER {
  MALE = 'male',
  FEMALE = 'female',
}

export const DEFAULT_PAGE_SIZE = 10
export const DEFAULT_PAGE = 1

export const DEFAULT_PASSWORD = '123456'
