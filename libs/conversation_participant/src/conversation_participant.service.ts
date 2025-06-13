import { Injectable } from '@nestjs/common';
import { ConversationParticipantRepository } from '@app/database';
import { IConversationParticipantService } from './conversation_participant.interface';

@Injectable()
export class ConversationParticipantService implements IConversationParticipantService {
  constructor(private readonly participantRepository: ConversationParticipantRepository) {}

  async create(data: {
    conversation_id: number;
    user_id: number;
    role: string;
    joined_at?: Date;
  }) {
    return this.participantRepository.create({
      ...data,
      joined_at: data.joined_at || new Date(),
    });
  }

  async findAll(params: {
    page: number;
    size: number;
    user_id?: number;
    conversation_id?: number;
    role?: string;
  }) {
    return this.participantRepository.findAll(params);
  }

  async findById(id: number) {
    return this.participantRepository.findById(id);
  }

  async update(id: number, data: any) {
    return this.participantRepository.update(id, data);
  }

  async softDelete(id: number) {
    return this.participantRepository.softDelete(id);
  }
}
