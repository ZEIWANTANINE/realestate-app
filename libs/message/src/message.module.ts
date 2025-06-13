import { Module } from '@nestjs/common';

import { MessageService } from './message.service';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [DatabaseModule],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
