import { USER_ROLE } from '@app/auth'


export const VALIDATION_ERROR = {
  code: '1000',
  message: 'VALIDATION_ERROR',
}

export const VALIDATION_MESSAGE_API_PREFIX = 'API'

export const UserRoleLabels: Record<USER_ROLE, string> = {
  [USER_ROLE.ADMIN]: 'Quản trị hệ thống',
  [USER_ROLE.AGENT]: 'Đơn vị quản lý',
  [USER_ROLE.BUYER]: 'Trưởng đơn vị',
}
export enum GENDER {
  MALE = 'male',
  FEMALE = 'female',
}
export enum STATUS{
  Pending = 'pending',
  Confirmed = 'confirmed',
  Canceled = 'canceled',
}
export enum HEAT {
  GAS = 'gas',
  ELECTRIC = 'electric',
  SOLAR = 'solar',
  NONE = 'none',
}
export enum COOL {
  AC = 'ac',
  CEILLINGFANS = 'ceiling_fans',
  NONE = 'none',
}
export enum MEDIA_TYPE {
  IMAGE = 'image',
  VIDEO = 'video',
  VIRTUALTOUR = 'virtual_tour',
}
export enum INDUSTRY {
  CHUDAUTU = 'chudautu',
  THICONGXAYDUNG = 'thicongxaydung',
  SANGIAODICH = 'sangiaodich',
  TRANGTRINOITHAT = 'trangtrinoithat',
  VATLIEUXAYDUNG = 'vatlieuxaydung',
  TAICHINHPHAPLY = 'taichinhphaply',
  KHAC = 'khac',
}
export enum PROPERTY_TYPE {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  LAND = 'land',
  CONDO = 'condo',
  VILLA = 'villa',
  TOWNHOUSE = 'townhouse',
}
export enum PLACE_TYPE {
  SCHOOL = 'school',
  HOSPITAL = 'hospital',
  PARK = 'park',
  SHOPPING = 'shopping',
  RESTAURANT = 'restaurant',
  TRANSPORTATION = 'transportation',
  MALL = 'mall',
  BANK = 'bank',
  SUPERMARKET = 'supermarket',
  GAS_STATION = 'gas_station',
  POLICE_STATION = 'police_station',
  OTHER = 'other',
}
export const DEFAULT_PAGE_SIZE = 10
export const DEFAULT_PAGE = 1

export const DEFAULT_PASSWORD = '123456'
