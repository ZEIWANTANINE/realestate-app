import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { PropertyFeaturesEntity } from '../entities/properties_features.entity'

@Injectable()
export class PropertyFeatureRepository {
  constructor(
    @InjectRepository(PropertyFeaturesEntity)
    private readonly repository: Repository<PropertyFeaturesEntity>,
  ) {}

  async create(data: Partial<PropertyFeaturesEntity>): Promise<PropertyFeaturesEntity> {
    return this.repository.save(this.repository.create(data))
  }

  async save(feature: PropertyFeaturesEntity): Promise<PropertyFeaturesEntity> {
    return this.repository.save(feature)
  }

  async findAll(params: {
    page: number
    size: number
    property_id?: number
  }) {
    const query = this.repository
      .createQueryBuilder('property_features')
      .where('property_features.deleted_at IS NULL')

    if (params.property_id) {
      query.andWhere('property_features.property_id = :property_id', { property_id: params.property_id })
    }

    query
      .orderBy('property_features.created_at', 'DESC')
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

  async findById(id: number): Promise<PropertyFeaturesEntity | null> {
    return this.repository.findOne({
      where: { id, deleted_at: IsNull() },
    })
  }

  async update(id: number, data: Partial<PropertyFeaturesEntity>): Promise<void> {
    await this.repository.update(id, data)
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id)
  }

  async findByPropertyId(property_id: number): Promise<PropertyFeaturesEntity[]> {
    return this.repository.find({
      where: { property_id, deleted_at: IsNull() },
      order: { created_at: 'DESC' },
    })
  }
}