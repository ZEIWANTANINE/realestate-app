import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseModule } from '@app/database';
import { ConfigModule, ConfigObject, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtUserStrategy } from './auth-jwt.stategy';
import { JwtAuthGuard } from './auth.guard';
import authConfig from 'config/auth.config';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtUserStrategy, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}


