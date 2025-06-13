import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { NotificationService } from './notification.service';
import { DatabaseModule } from '@app/database';
import { MessageModule } from '../../message/src/message.module';
import { ConversationModule } from '../../conversation/src/conversation.module';

@Module({
  imports: [DatabaseModule, MessageModule, ConversationModule],
  providers: [NotificationGateway, NotificationService],
  exports: [NotificationService, NotificationGateway]
})
export class NotificationModule {} 