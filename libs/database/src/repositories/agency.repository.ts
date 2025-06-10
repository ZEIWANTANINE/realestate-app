import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { AgencyEntity } from '../entities/agency.entity'

@Injectable()
export class AgencyRepository {
  constructor(
    @InjectRepository(AgencyEntity)
    private readonly repository: Repository<AgencyEntity>,
  ) {}

  async create(data: Partial<AgencyEntity>): Promise<AgencyEntity> {
    return this.repository.save(this.repository.create(data))
  }

  async findById(id: number): Promise<AgencyEntity | null> {
    return this.repository.findOne({
      where: { id, deleted_at: IsNull() },
    })
  }

  async findAll(p0: { size: number; page: number; key?: string }): Promise<AgencyEntity[]> {
    return this.repository.find({
      where: { deleted_at: IsNull() },
      order: { created_at: 'DESC' },
    })
  }

  async update(id: number, data: Partial<AgencyEntity>): Promise<void> {
    await this.repository.update(id, data)
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id)
  }
}