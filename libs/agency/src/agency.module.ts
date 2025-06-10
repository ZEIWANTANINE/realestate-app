import { Module } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { DatabaseModule } from '@app/database';

@Module({
  imports:[DatabaseModule],
  providers: [AgencyService],
  exports: [AgencyService],
})
export class AgencyModule {}
