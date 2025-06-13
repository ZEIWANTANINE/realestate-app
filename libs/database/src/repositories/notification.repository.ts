import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { NotificationEntity } from '../entities/notification.entity'

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly repository: Repository<NotificationEntity>,
  ) {}

  async create(data: Partial<NotificationEntity>): Promise<NotificationEntity> {
    return this.repository.save(this.repository.create(data))
  }

  async save(notification: NotificationEntity): Promise<NotificationEntity> {
    return this.repository.save(notification)
  }

  async findAll(params: {
    page: number
    size: number
    user_id?: number
    type?: string
    is_read?: boolean
  }) {
    const query = this.repository
      .createQueryBuilder('notifications')
      .where('notifications.deleted_at IS NULL')

    if (params.user_id) {
      query.andWhere('notifications.user_id = :user_id', { user_id: params.user_id })
    }
    if (params.type) {
      query.andWhere('notifications.type = :type', { type: params.type })
    }
    if (params.is_read !== undefined) {
      query.andWhere('notifications.is_read = :is_read', { is_read: params.is_read })
    }

    query
      .orderBy('notifications.created_at', 'DESC')
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

  async findById(id: number): Promise<NotificationEntity | null> {
    return this.repository.findOne({
      where: { id, deleted_at: IsNull() },
    })
  }

  async update(id: number, data: Partial<NotificationEntity>): Promise<void> {
    await this.repository.update(id, data)
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id)
  }

  async markAsRead(id: number): Promise<void> {
    await this.repository.update(id, {
      is_read: true,
      read_at: new Date(),
    })
  }
}