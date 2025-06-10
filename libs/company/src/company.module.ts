import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [DatabaseModule],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
