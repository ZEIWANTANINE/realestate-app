import { GENDER } from '@app/common'
import { USER_ROLE } from './auth.const'

export interface LoginPayload {
  sub: number
  email: string
  role: string
}

export interface ICreateInfo {
  name: string
  email: string
  phone: string
  gender: GENDER
  password: string
  organization_id?: number
  code?: string
  level?: string
  hour_target?: number
}
