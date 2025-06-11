import { UserModule } from '@app/user';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { DatabaseModule } from '@app/database';
import { SanitizePathMiddleware } from '../sanitize.path-middleware';
import { BuyerProfileModule } from '@app/buyer_profile';
import { BuyerProfileController } from './buyer_profiles/buyer_profiles.controller';
import { AgentProfileController } from './agent_profiles/agent_profiles.controller';
import { AgentProfileModule } from '@app/agent_profile/agent_profile.module';
import { AgencyModule } from '@app/agency';
import { AgencyController } from './agency/agency.controller';
import { CompanyModule } from '@app/company';
import { CompanyController } from './company/company.controller';
import { NewsModule } from '@app/news';
import { NewController } from './new/new.controller';
import { PropertyModule } from '@app/property';
import { PropertyController } from './property/property.controller';
import { FavouriteModule } from '@app/favourite';
import { FavouriteController } from './favourite/favourite.controller';
import { ViewingModule } from '@app/viewing/viewing.module';
import { ViewingController } from './viewing/viewing.controller';
@Module({
  imports: [
    DatabaseModule,
    UserModule,
    BuyerProfileModule,
    AgentProfileModule,
    AgencyModule,
    CompanyModule,
    NewsModule,
    PropertyModule,
    FavouriteModule,
    ViewingModule
  ],
  controllers: [
    UserController,
    BuyerProfileController,
    AgentProfileController,
    AgencyController,
    CompanyController,
    NewController,
    PropertyController,
    FavouriteController,
    ViewingController
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