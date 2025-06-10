import { USER_ROLE } from '@app/auth'

export interface ICreateBuyerProfile {
  user_id: number
  name?: string
  phone?: string
  avatar_url?: string
  prefered_location?: string
  budget?: number
}

export interface IUpdateBuyerProfile {
    user_id: number
  name?: string
  phone?: string
  avatar_url?: string
  prefered_location?: string
  budget?: number
}

export interface IListBuyerProfile {
  page?: number
  size?: number
  key?: string
  user_id?: number
}