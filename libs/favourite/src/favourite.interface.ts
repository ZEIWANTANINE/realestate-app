export interface ICreateFavourite {
  user_id?: number
  property_id?: number
}

export interface IUpdateFavourite {
  user_id?: number
  property_id?: number
}

export interface IListFavourite {
  page?: number
  size?: number
  key?: string
  user_id?: number
  property_id?: number
}