import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { ConversationParticipantEntity } from '../entities/conversation_participant.entity'

@Injectable()
export class ConversationParticipantRepository {
  constructor(
    @InjectRepository(ConversationParticipantEntity)
    private readonly repository: Repository<ConversationParticipantEntity>,
  ) {}

  async create(data: Partial<ConversationParticipantEntity>): Promise<ConversationParticipantEntity> {
    return this.repository.save(this.repository.create(data))
  }

  async save(participant: ConversationParticipantEntity): Promise<ConversationParticipantEntity> {
    return this.repository.save(participant)
  }

  async findAll(params: {
    page: number
    size: number
    user_id?: number
    conversation_id?: number
    role?: string
  }) {
    const query = this.repository
      .createQueryBuilder('conversation_participants')
      .where('conversation_participants.deleted_at IS NULL')

    if (params.user_id) {
      query.andWhere('conversation_participants.user_id = :user_id', { user_id: params.user_id })
    }
    if (params.conversation_id) {
      query.andWhere('conversation_participants.converstion_id = :conversation_id', { conversation_id: params.conversation_id })
    }
    if (params.role) {
      query.andWhere('conversation_participants.role = :role', { role: params.role })
    }

    query
      .orderBy('conversation_participants.created_at', 'DESC')
      .skip((params.page - 1) * params.size)
      .take(params.size)

    const [data, total] = await query.getManyAndCount()
    return {
      data,
      pagination: {
        total,
        size: params.size,
        page: params.page,
      },
    }
  }

  async findById(id: number): Promise<ConversationParticipantEntity | null> {
    return this.repository.findOne({
      where: { id, deleted_at: IsNull() },
    })
  }

  async update(id: number, data: Partial<ConversationParticipantEntity>): Promise<void> {
    await this.repository.update(id, data)
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id)
  }
}