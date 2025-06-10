export class ICreateAgency {
    name?: string
    phone?: string
    address?: string
    logo_url?: string
    website?: string
  }
  
  export interface IUpdateAgency {
    name?: string
    phone?: string
    address?: string
    logo_url?: string
    website?: string
  }
  
  export interface IListAgency {
    page?: number
    size?: number
    key?: string
  }