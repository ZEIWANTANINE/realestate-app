import { USER_ROLE } from '@app/auth'
import { GENDER } from '@app/common'

export interface ICreateUser {
  name: string
  email: string
  phone: string
  gender: GENDER
  password?: string
  organization_id?: number
  role: USER_ROLE
  code?: string
  level?: string
  hour_target?: number
}

export interface IUpdateUser {
  name?: string
  phone?: string
  gender?: GENDER
  organization_id?: number
  role?: USER_ROLE
  code?: string
  level?: string
  hour_target?: number
}

export interface IListUser {
  page?: number
  size?: number
  key?: string
  organization_id?: number
}
