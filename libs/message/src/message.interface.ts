import { MessageEntity } from '@app/database';

export interface IMessageService {
  create(data: {
    conversation_id: number;
    sender_id: number;
    message: string;
    message_type: string;
    media_url?: string;
  }): Promise<MessageEntity>;

  findAll(params: {
    page: number;
    size: number;
    conversation_id?: number;
    sender_id?: number;
  }): Promise<{
    data: MessageEntity[];
    pagination: {
      total: number;
      size: number;
      page: number;
    };
  }>;

  findById(id: number): Promise<MessageEntity | null>;
}
