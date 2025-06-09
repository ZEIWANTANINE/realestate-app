import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { PropertiesEntity } from '../entities/properties.entity'

@Injectable()
export class PropertyRepository {
  constructor(
    @InjectRepository(PropertiesEntity)
    private readonly repository: Repository<PropertiesEntity>,
  ) {}

  async create(data: Partial<PropertiesEntity>): Promise<PropertiesEntity> {
    return this.repository.save(this.repository.create(data))
  }

  async save(property: PropertiesEntity): Promise<PropertiesEntity> {
    return this.repository.save(property)
  }

  async findAll(params: {
    page: number
    size: number
    key?: string
    agent_id?: number
    company_id?: number
  }) {
    const query = this.repository
      .createQueryBuilder('properties')
      .where('properties.deleted_at IS NULL')

    if (params.key) {
      query.andWhere(
        '(properties.title LIKE :keyword OR properties.description LIKE :keyword OR properties.address LIKE :keyword)',
        { keyword: `%${params.key}%` },
      )
    }
    if (params.agent_id) {
      query.andWhere('properties.agent_id = :agent_id', { agent_id: params.agent_id })
    }
    if (params.company_id) {
      query.andWhere('properties.company_id = :company_id', { company_id: params.company_id })
    }

    query
      .orderBy('properties.created_at', 'DESC')
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

  async findById(id: number): Promise<PropertiesEntity | null> {
    return this.repository.findOne({
      where: { id, deleted_at: IsNull() },
    })
  }

  async update(id: number, data: Partial<PropertiesEntity>): Promise<void> {
    await this.repository.update(id, data)
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id)
  }
}