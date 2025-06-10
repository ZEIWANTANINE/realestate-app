export interface ICreateProperty {
  agent_id: number
  company_id: number
  title?: string
  description?: string
  price?: number
  address?: string
  city?: string
  state?: string
  country?: string
  zipcode?: string
  latitude?: number
  longtitude?: number
  property_type?: string
  bedrooms?: number
  bathrooms?: number
  area_size?: number
  year_built?: number
  floors?: number
  parking_spaces?: number
  is_active?: boolean
}

export interface IUpdateProperty {
  agent_id: number
  company_id: number
  title?: string
  description?: string
  price?: number
  address?: string
  city?: string
  state?: string
  country?: string
  zipcode?: string
  latitude?: number
  longtitude?: number
  property_type?: string
  bedrooms?: number
  bathrooms?: number
  area_size?: number
  year_built?: number
  floors?: number
  parking_spaces?: number
  is_active?: boolean
}

export interface ICreateProperty {
  page?: number
  size?: number
  key?: string
}