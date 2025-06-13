import { MessageReadEntity } from '@app/database';

export interface IMessageReadService {
  create(data: {
    message_id: number;
    user_id: number;
    read_at?: Date;
  }): Promise<MessageReadEntity>;

  findAll(params: {
    page: number;
    size: number;
    user_id?: number;
    message_id?: number;
    conversation_id?: number;
  }): Promise<{
    data: MessageReadEntity[];
    pagination: {
      total: number;
      size: number;
      page: number;
    };
  }>;

  findById(id: number): Promise<MessageReadEntity | null>;

  markMessageAsRead(messageId: number, userId: number): Promise<MessageReadEntity>;

  getUnreadMessages(userId: number, conversationId: number): Promise<MessageReadEntity[]>;
}
