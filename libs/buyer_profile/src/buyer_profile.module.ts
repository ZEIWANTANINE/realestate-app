import { Module } from '@nestjs/common';
import { BuyerProfileService } from './buyer_profile.service';
import { BuyerProfilesRepository, DatabaseModule } from '@app/database';

@Module({
  imports: [DatabaseModule],
  providers: [BuyerProfileService,BuyerProfilesRepository],
  exports: [BuyerProfileService],
})
export class BuyerProfileModule {}
