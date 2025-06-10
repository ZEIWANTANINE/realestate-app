import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { CompanyEntity } from '../entities/companies.entity'

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly repository: Repository<CompanyEntity>,
  ) {}

  async create(data: Partial<CompanyEntity>): Promise<CompanyEntity> {
    return this.repository.save(this.repository.create(data))
  }

  async findById(id: number): Promise<CompanyEntity | null> {
    return this.repository.findOne({
      where: { id, deleted_at: IsNull() },
    })
  }

  async findAll(p0: { size: number; page: any; key? }): Promise<CompanyEntity[]> {
    return this.repository.find({
      where: { deleted_at: IsNull() },
      order: { created_at: 'DESC' },
    })
  }

  async update(id: number, data: Partial<CompanyEntity>): Promise<void> {
    await this.repository.update(id, data)
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id)
  }
}