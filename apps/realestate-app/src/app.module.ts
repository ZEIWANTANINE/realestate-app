import { UserModule } from '@app/user';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { DatabaseModule } from '@app/database';
import { SanitizePathMiddleware } from '../sanitize.path-middleware';


@Module({
  imports: [
    DatabaseModule,
    UserModule
  ],
  controllers: [
    UserController

  ],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SanitizePathMiddleware)
      .forRoutes({ path: 'public/*', method: RequestMethod.ALL })
  }
} 