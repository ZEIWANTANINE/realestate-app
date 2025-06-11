export interface ICreatePropertyPriceHistory {
  property_id?: number
  recorded_at?: Date
  price?: number
}

export interface IUpdatePropertyPriceHistory {
  property_id?: number
  recorded_at?: Date
  price?: number
}

export interface IListPropertyPriceHistory {
  page?: number
  size?: number
  key?: string
  property_id?: number
}