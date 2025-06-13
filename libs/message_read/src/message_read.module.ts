import { Module } from '@nestjs/common';
import { MessageReadService } from './message_read.service';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [DatabaseModule],
  providers: [MessageReadService],
  exports: [MessageReadService],
})
export class MessageReadModule {}
