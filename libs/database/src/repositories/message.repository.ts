import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { MessageEntity } from '../entities/message.entity'

@Injectable()
export class MessageRepository {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly repository: Repository<MessageEntity>,
  ) {}

  async create(data: Partial<MessageEntity>): Promise<MessageEntity> {
    return this.repository.save(this.repository.create(data))
  }

  async save(message: MessageEntity): Promise<MessageEntity> {
    return this.repository.save(message)
  }

  async findAll(params: {
    page: number
    size: number
    conversation_id?: number
    sender_id?: number
  }) {
    const query = this.repository
      .createQueryBuilder('messages')
      .where('messages.deleted_at IS NULL')

    if (params.conversation_id) {
      query.andWhere('messages.conversation_id = :conversation_id', { conversation_id: params.conversation_id })
    }
    if (params.sender_id) {
      query.andWhere('messages.sender_id = :sender_id', { sender_id: params.sender_id })
    }

    query
      .orderBy('messages.created_at', 'DESC')
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

  async findById(id: number): Promise<MessageEntity | null> {
    return this.repository.findOne({
      where: { id, deleted_at: IsNull() },
    })
  }

  async update(id: number, data: Partial<MessageEntity>): Promise<void> {
    await this.repository.update(id, data)
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id)
  }
}