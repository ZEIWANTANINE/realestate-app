import { USER_ROLE } from '@app/auth'

export interface ICreateUser {
  email: string
  password?: string
  role: USER_ROLE
}

export interface IUpdateUser {
  email?: string
  password?: string
  role?: USER_ROLE
}

export interface IListUser {
  page?: number
  size?: number
  key?: string
}