import { Injectable } from '@nestjs/common';
import { ConversationRepository } from '@app/database';
import { ConversationParticipantRepository } from '@app/database';
import { IConversationService } from './conversation.interface';

@Injectable()
export class ConversationService implements IConversationService {
  constructor(
    private readonly conversationRepository: ConversationRepository,
    private readonly conversationParticipantRepository: ConversationParticipantRepository,
  ) {}

  async create(data: { type: string; name?: string }) {
    return this.conversationRepository.create(data);
  }

  async findAll(params: {
    page: number;
    size: number;
    created_by?: number;
    type?: string;
  }) {
    return this.conversationRepository.findAll(params);
  }

  async findById(id: number) {
    return this.conversationRepository.findById(id);
  }

  async addParticipant(data: {
    conversation_id: number;
    user_id: number;
    role: string;
  }) {
    return this.conversationParticipantRepository.create({
      ...data,
      joined_at: new Date(),
    });
  }

  async getConversationParticipants(conversationId: number) {
    const result = await this.conversationParticipantRepository.findAll({
      page: 1,
      size: 100,
      conversation_id: conversationId,
    });
    return result.data;
  }
}
