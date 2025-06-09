import { registerAs } from '@nestjs/config'

export default registerAs('auth', () => ({
  accessTokenExpire: process.env.AUTH_ACCESS_TOKEN_EXPIRE || '1h',
  refreshTokenExpire: process.env.AUTH_REFRESH_TOKEN_EXPIRE || '7d',
}))
