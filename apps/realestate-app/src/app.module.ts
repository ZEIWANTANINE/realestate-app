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
import { PropertyPriceHistoryModule } from '@app/property_price_history/property_price_history.module';
import { PropertyPriceHistoryController } from './property_price_history/property_price_history.controller';
import { PropertyMediaModule } from '@app/property_media';
import { PropertyMediaController } from './property_media/property_media.controller';
import { PropertyFeaturesModule } from '@app/property_features';
import { PropertyFeatureController } from './property_feature/property_feature.controller';
import { NearbyPlaceModule } from '@app/nearby_place';
import { NearbyPlaceController } from './nearby_place/nearby_place.controller';
import { TransactionModule } from '@app/transaction';
import { TransactionController } from './transaction/transaction.controller';

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
    ViewingModule,
    PropertyPriceHistoryModule,
    PropertyMediaModule,
    PropertyFeaturesModule,
    NearbyPlaceModule,
    TransactionModule
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
    ViewingController,
    PropertyPriceHistoryController,
    PropertyMediaController,
    PropertyFeatureController,
    NearbyPlaceController,
    TransactionController
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