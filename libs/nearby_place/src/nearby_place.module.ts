import { Module } from '@nestjs/common';
import { NearbyPlaceService } from './nearby_place.service';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [DatabaseModule],
  providers: [NearbyPlaceService],
  exports: [NearbyPlaceService],
})
export class NearbyPlaceModule {}
