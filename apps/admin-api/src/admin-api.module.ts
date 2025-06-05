import { Module,RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { SanitizePathMiddleware } from '../sanitize.path-middleware';
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from '@app/database'
import { UserModule } from '@app/user'
//import { UserController } from '@app/user/user.controller'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    UserModule,
  ],
 // controllers: [UserController],
  providers: [],
})
export class AdminApiModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SanitizePathMiddleware)
      .forRoutes({ path: 'public/*', method: RequestMethod.ALL })
  }
}
