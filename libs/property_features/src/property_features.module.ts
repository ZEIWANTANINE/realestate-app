import { Module } from '@nestjs/common';
import { PropertyFeaturesService } from './property_features.service';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [DatabaseModule],
  providers: [PropertyFeaturesService],
  exports: [PropertyFeaturesService],
})
export class PropertyFeaturesModule {}
