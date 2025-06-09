import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { ConversationEntity } from '../entities/conversation.entity'

@Injectable()
export class ConversationRepository {
  constructor(
    @InjectRepository(ConversationEntity)
    private readonly repository: Repository<ConversationEntity>,
  ) {}

  async create(data: Partial<ConversationEntity>): Promise<ConversationEntity> {
    return this.repository.save(this.repository.create(data))
  }

  async save(conversation: ConversationEntity): Promise<ConversationEntity> {
    return this.repository.save(conversation)
  }

  async findAll(params: {
    page: number
    size: number
    created_by?: number
    type?: string
  }) {
    const query = this.repository
      .createQueryBuilder('conversations')
      .where('conversations.deleted_at IS NULL')

    if (params.created_by) {
      query.andWhere('conversations.created_by = :created_by', { created_by: params.created_by })
    }
    if (params.type) {
      query.andWhere('conversations.type = :type', { type: params.type })
    }

    query
      .orderBy('conversations.created_at', 'DESC')
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

  async findById(id: number): Promise<ConversationEntity | null> {
    return this.repository.findOne({
      where: { id, deleted_at: IsNull() },
    })
  }

  async update(id: number, data: Partial<ConversationEntity>): Promise<void> {
    await this.repository.update(id, data)
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id)
  }
}