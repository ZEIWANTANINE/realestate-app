export interface ICreatePropertyFeature {
  property_id?: number
  heating_type?: string
  cooling_type?: string
  furnished?: boolean
}

export interface IUpdatePropertyfeature {
  property_id?: number
  heating_type?: string
  cooling_type?: string
  furnished?: boolean
}

export interface IListPropertyFeature {
  page?: number
  size?: number
  key?: string
  property_id?: number
}