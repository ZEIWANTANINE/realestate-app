import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [DatabaseModule],
  providers: [PropertyService],
  exports: [PropertyService],
})
export class PropertyModule {}
