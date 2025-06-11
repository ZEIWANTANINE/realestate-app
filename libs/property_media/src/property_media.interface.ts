export interface ICreatePropertyMedia {
  property_id?: number
  media_type?: string
  media_url?: string
  caption?: string
}

export interface IUpdatePropertyMedia{
  property_id?: number
  media_type?: string
  media_url?: string
  caption?: string
}

export interface IListPropertyMedia{
  page?: number
  size?: number
  key?: string
  property_id?: number
}