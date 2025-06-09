import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { PropertyPriceHistoryEntity } from '../entities/property_price_history.entity'

@Injectable()
export class PropertyPriceHistoryRepository {
  constructor(
    @InjectRepository(PropertyPriceHistoryEntity)
    private readonly repository: Repository<PropertyPriceHistoryEntity>,
  ) {}

  async create(data: Partial<PropertyPriceHistoryEntity>): Promise<PropertyPriceHistoryEntity> {
    return this.repository.save(this.repository.create(data))
  }

  async save(history: PropertyPriceHistoryEntity): Promise<PropertyPriceHistoryEntity> {
    return this.repository.save(history)
  }

  async findAll(params: {
    page: number
    size: number
    property_id?: number
  }) {
    const query = this.repository
      .createQueryBuilder('property_price_history')
      .where('property_price_history.deleted_at IS NULL')

    if (params.property_id) {
      query.andWhere('property_price_history.property_id = :property_id', { property_id: params.property_id })
    }

    query
      .orderBy('property_price_history.recorded_at', 'DESC')
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

  async findById(id: number): Promise<PropertyPriceHistoryEntity | null> {
    return this.repository.findOne({
      where: { id, deleted_at: IsNull() },
    })
  }

  async update(id: number, data: Partial<PropertyPriceHistoryEntity>): Promise<void> {
    await this.repository.update(id, data)
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id)
  }

  async findByPropertyId(property_id: number): Promise<PropertyPriceHistoryEntity[]> {
    return this.repository.find({
      where: { property_id, deleted_at: IsNull() },
      order: { recorded_at: 'DESC' },
    })
  }
}