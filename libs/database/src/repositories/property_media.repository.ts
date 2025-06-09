import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { PropertyMediaEntity } from '../entities/property_media.entity'

@Injectable()
export class PropertyMediaRepository {
  constructor(
    @InjectRepository(PropertyMediaEntity)
    private readonly repository: Repository<PropertyMediaEntity>,
  ) {}

  async create(data: Partial<PropertyMediaEntity>): Promise<PropertyMediaEntity> {
    return this.repository.save(this.repository.create(data))
  }

  async save(media: PropertyMediaEntity): Promise<PropertyMediaEntity> {
    return this.repository.save(media)
  }

  async findAll(params: {
    page: number
    size: number
    property_id?: number
    media_type?: string
  }) {
    const query = this.repository
      .createQueryBuilder('property_media')
      .where('property_media.deleted_at IS NULL')

    if (params.property_id) {
      query.andWhere('property_media.property_id = :property_id', { property_id: params.property_id })
    }
    if (params.media_type) {
      query.andWhere('property_media.media_type = :media_type', { media_type: params.media_type })
    }

    query
      .orderBy('property_media.created_at', 'DESC')
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

  async findById(id: number): Promise<PropertyMediaEntity | null> {
    return this.repository.findOne({
      where: { id, deleted_at: IsNull() },
    })
  }

  async update(id: number, data: Partial<PropertyMediaEntity>): Promise<void> {
    await this.repository.update(id, data)
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id)
  }

  async findByPropertyId(property_id: number): Promise<PropertyMediaEntity[]> {
    return this.repository.find({
      where: { property_id, deleted_at: IsNull() },
      order: { created_at: 'DESC' },
    })
  }
}