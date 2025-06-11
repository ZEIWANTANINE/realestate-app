export interface ICreateViewing {
  buyer_id?: number
  property_id?: number
  schedule_date?: Date
  status?: string
}

export interface IUpdateViewing {
  buyer_id?: number
  property_id?: number
  schedule_date?: Date
  status?: string
}

export interface IListViewing {
  page?: number
  size?: number
  key?: string
  status?: string
  buyer_id?: number
  property_id?: number
}