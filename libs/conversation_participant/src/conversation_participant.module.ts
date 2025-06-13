import { Module } from '@nestjs/common';
import { ConversationParticipantService } from './conversation_participant.service';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [DatabaseModule],
  providers: [ConversationParticipantService],
  exports: [ConversationParticipantService],
})
export class ConversationParticipantModule {}
