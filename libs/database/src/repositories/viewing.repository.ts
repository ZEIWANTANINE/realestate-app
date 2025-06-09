import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { ViewingEntity } from '../entities/viewing.entity'

@Injectable()
export class ViewingRepository {
  constructor(
    @InjectRepository(ViewingEntity)
    private readonly repository: Repository<ViewingEntity>,
  ) {}

  async create(data: Partial<ViewingEntity>): Promise<ViewingEntity> {
    return this.repository.save(this.repository.create(data))
  }

  async save(viewing: ViewingEntity): Promise<ViewingEntity> {
    return this.repository.save(viewing)
  }

  async findAll(params: {
    page: number
    size: number
    property_id?: number
    buyer_id?: number
    status?: string
  }) {
    const query = this.repository
      .createQueryBuilder('viewings')
      .where('viewings.deleted_at IS NULL')

    if (params.property_id) {
      query.andWhere('viewings.property_id = :property_id', { property_id: params.property_id })
    }
    if (params.buyer_id) {
      query.andWhere('viewings.buyer_id = :buyer_id', { buyer_id: params.buyer_id })
    }
    if (params.status) {
      query.andWhere('viewings.status = :status', { status: params.status })
    }

    query
      .orderBy('viewings.created_at', 'DESC')
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

  async findById(id: number): Promise<ViewingEntity | null> {
    return this.repository.findOne({
      where: { id, deleted_at: IsNull() },
    })
  }

  async update(id: number, data: Partial<ViewingEntity>): Promise<void> {
    await this.repository.update(id, data)
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id)
  }

  async findByPropertyAndBuyer(property_id: number, buyer_id: number): Promise<ViewingEntity | null> {
    return this.repository.findOne({
      where: { property_id, buyer_id, deleted_at: IsNull() },
    })
  }
}