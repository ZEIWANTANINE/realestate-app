import { GENDER } from '@app/common'
import { USER_ROLE } from './auth.const'

export interface LoginPayload {
  sub: number
  email: string
  role: string
}

export interface ICreateInfo {
  email: string
  password_hash?: string
}
