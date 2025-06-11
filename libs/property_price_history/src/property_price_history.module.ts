import { Module } from '@nestjs/common';
import { PropertyPriceHistoryService } from './property_price_history.service';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [DatabaseModule],
  providers: [PropertyPriceHistoryService],
  exports: [PropertyPriceHistoryService],
})
export class PropertyPriceHistoryModule {}
