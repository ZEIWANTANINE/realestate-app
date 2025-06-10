import { Module } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [DatabaseModule],
  providers: [FavouriteService],
  exports: [FavouriteService],
})
export class FavouriteModule {}
