import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [DatabaseModule],
  providers: [ConversationService],
  exports: [ConversationService],
})
export class ConversationModule {}
