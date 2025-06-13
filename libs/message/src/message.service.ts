import { Injectable } from '@nestjs/common';
import { MessageRepository } from '@app/database';
import { IMessageService } from './message.interface';

@Injectable()
export class MessageService implements IMessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  async create(data: {
    conversation_id: number;
    sender_id: number;
    message: string;
    message_type: string;
    media_url?: string;
  }) {
    return this.messageRepository.create(data);
  }

  async findAll(params: {
    page: number;
    size: number;
    conversation_id?: number;
    sender_id?: number;
  }) {
    return this.messageRepository.findAll(params);
  }

  async findById(id: number) {
    return this.messageRepository.findById(id);
  }

  async markAsRead(id: number) {
    // This method will be handled by MessageReadRepository
    return { success: true };
  }

  async getUnreadMessages(conversationId: number, userId: number) {
    // This method will be handled by MessageReadRepository
    return { messages: [] };
  }
}
