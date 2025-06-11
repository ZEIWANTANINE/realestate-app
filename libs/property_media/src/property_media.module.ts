import { Module } from '@nestjs/common';
import { PropertyMediaService } from './property_media.service';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [DatabaseModule],
  providers: [PropertyMediaService],
  exports: [PropertyMediaService],
})
export class PropertyMediaModule {}
