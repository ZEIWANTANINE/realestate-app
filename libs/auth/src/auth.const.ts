export enum USER_ROLE {
    SYSTEM_ADMIN = 'system_admin',
    MANAGING_UNIT = 'managing_unit',
    HEAD_OF_UNIT = 'head_of_unit',
    DATA_ENTRY = 'data_entry',
    USER = 'user',
  }
  
  export const AUTH_ADMIN_ROLES_KEY = 'auth_roles'
  
  export const AUTH_ADMIN_NAME = 'jwt-admin'
  
  export enum ADMIN_EXCEPTIONS {
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    INVALID_REFRESH_TOKEN = 'INVALID_REFRESH_TOKEN',
    INVALID_ACCESS_TOKEN = 'INVALID_ACCESS_TOKEN',
    ACCESS_TOKEN_EXPIRE = 'ACCESS_TOKEN_EXPIRE',
    ADMIN_NOT_FOUND = 'ADMIN_NOT_FOUND',
  }
  