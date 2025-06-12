import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { DatabaseModule } from '@app/database';
import { TransactionController } from 'apps/realestate-app/src/transaction/transaction.controller';

@Module({
  imports: [DatabaseModule],
  providers: [TransactionService],
  exports: [TransactionService],
  controllers: [],
})
export class TransactionModule {}
