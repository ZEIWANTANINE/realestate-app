export interface ICreateNearbyPlace {
  property_id?: number
  place_type?: string
  name?: string
  address?: string
  latitude?: number
  longtitude?: number
  distance?: number
  icon_url?: string
}

export interface IUpdateNearbyPlace {
  property_id?: number
  place_type?: string
  name?: string
  address?: string
  latitude?: number
  longtitude?: number
  distance?: number
  icon_url?: string
}

export interface IListNearbyPlace {
  page?: number
  size?: number
  key?: string
  property_id?: number
}