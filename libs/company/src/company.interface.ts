export interface ICreateCompany {
  name?: string
  industry?: string
  email?: string
  phone?: string
  address?: string
  description?: string
  logo_url?: string
  website?: string
}

export interface IUpdateCompany {
  name?: string
  industry?: string
  email?: string
  phone?: string
  address?: string
  description?: string
  logo_url?: string
  website?: string
}

export interface IListCompany {
  page?: number
  size?: number
  key?: string
}