export interface ICreateNew {
  user_id?: number
  title?: string
  content?: string
  thumbnail_url?: string
  source_url?: string
  published_at?: Date
  tags?: string
}

export interface IUpdateNew {
  user_id?: number
  title?: string
  content?: string
  thumbnail_url?: string
  source_url?: string
  published_at?: Date
  tags?: string
}

export interface IListNew {
  page?: number
  size?: number
  key?: string
}