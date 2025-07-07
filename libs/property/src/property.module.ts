import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { DatabaseModule } from '@app/database';
import { GooglemapModule } from '@app/googlemap';

@Module({
  imports: [DatabaseModule, GooglemapModule],
  providers: [PropertyService],
  exports: [PropertyService],
})
export class PropertyModule {}
