import { Injectable } from '@nestjs/common'
import { MessageReadRepository } from '@app/database'
import { IMessageReadService } from './message_read.interface'

@Injectable()
export class MessageReadService implements IMessageReadService {
  constructor(private readonly messageReadRepository: MessageReadRepository) {}

  async create(data: {
    message_id: number;
    user_id: number;
    read_at?: Date;
  }) {
    return this.messageReadRepository.create({
      ...data,
      read_at: data.read_at || new Date(),
    })
  }

  async findAll(params: {
    page: number;
    size: number;
    user_id?: number;
    message_id?: number;
    conversation_id?: number;
  }) {
    return this.messageReadRepository.findAll(params)
  }

  async findById(id: number) {
    return this.messageReadRepository.findById(id)
  }



  async softDelete(id: number) {
    return this.messageReadRepository.softDelete(id)
  }

  async markMessageAsRead(messageId: number, userId: number) {
    return this.create({
      message_id: messageId,
      user_id: userId,
      read_at: new Date(),
    })
  }

  async getUnreadMessages(userId: number, conversationId: number) {
    const result = await this.messageReadRepository.findAll({
      page: 1,
      size: 100,
      user_id: userId,
      conversation_id: conversationId,
    })
    return result.data
  }
} 