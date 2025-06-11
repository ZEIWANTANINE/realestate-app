import { Module } from '@nestjs/common';
import { ViewingService } from './viewing.service';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [DatabaseModule],
  providers: [ViewingService],
  exports: [ViewingService],
})
export class ViewingModule {}
