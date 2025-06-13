import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { MessageReadEntity } from '../entities/message_read.entity'
import { MessageEntity } from '../entities/message.entity'

@Injectable()
export class MessageReadRepository {
  constructor(
    @InjectRepository(MessageReadEntity)
    private readonly repository: Repository<MessageReadEntity>,
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async create(data: Partial<MessageReadEntity>): Promise<MessageReadEntity> {
    return this.repository.save(this.repository.create(data))
  }

  async save(messageRead: MessageReadEntity): Promise<MessageReadEntity> {
    return this.repository.save(messageRead)
  }

  async findAll(params: {
    page: number
    size: number
    user_id?: number
    message_id?: number
    conversation_id?: number
  }) {
    const query = this.repository
      .createQueryBuilder('message_reads')
      .leftJoin('message', 'messages', 'messages.id = message_reads.message_id')
      .where('message_reads.deleted_at IS NULL')

    if (params.user_id) {
      query.andWhere('message_reads.user_id = :user_id', { user_id: params.user_id })
    }
    if (params.message_id) {
      query.andWhere('message_reads.message_id = :message_id', { message_id: params.message_id })
    }
    if (params.conversation_id) {
      query.andWhere('messages.conversation_id = :conversation_id', { conversation_id: params.conversation_id })
    }

    query
      .orderBy('message_reads.read_at', 'DESC')
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

  async findById(id: number): Promise<MessageReadEntity | null> {
    return this.repository.findOne({
      where: { id, deleted_at: IsNull() },
    })
  }

  async update(id: number, data: Partial<MessageReadEntity>): Promise<void> {
    await this.repository.update(id, data)
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id)
  }
}