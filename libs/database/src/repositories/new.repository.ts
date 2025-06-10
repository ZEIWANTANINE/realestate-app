import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { NewEntity } from '../entities/new.entity'

@Injectable()
export class NewRepository {
  constructor(
    @InjectRepository(NewEntity)
    private readonly repository: Repository<NewEntity>,
  ) {}

  async create(data: Partial<NewEntity>): Promise<NewEntity> {
    return this.repository.save(this.repository.create(data))
  }

  async save(news: NewEntity): Promise<NewEntity> {
    return this.repository.save(news)
  }

  async findAll(params: {
    page: number
    size: number
    key?: string
    user_id?: number
  }) {
    const query = this.repository
      .createQueryBuilder('news')
      .where('news.deleted_at IS NULL')

    if (params.key) {
      query.andWhere(
        '(news.title LIKE :keyword OR news.content LIKE :keyword OR news.tags LIKE :keyword)',
        { keyword: `%${params.key}%` },
      )
    }
    if (params.user_id) {
      query.andWhere('news.user_id = :user_id', { user_id: params.user_id })
    }

    query
      .orderBy('news.created_at', 'DESC')
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

  async findById(id: number): Promise<NewEntity | null> {
    return this.repository.findOne({
      where: { id, deleted_at: IsNull() },
    })
  }

  async update(id: number, data: Partial<NewEntity>): Promise<void> {
    await this.repository.update(id, data)
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id)
  }
}