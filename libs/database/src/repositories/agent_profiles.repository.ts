import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { AgentProfilesEntity } from '../entities/agent_profiles.entity'

@Injectable()
export class AgentProfilesRepository {
  constructor(
    @InjectRepository(AgentProfilesEntity)
    private readonly repository: Repository<AgentProfilesEntity>,
  ) {}

  async create(data: Partial<AgentProfilesEntity>): Promise<AgentProfilesEntity> {
    return this.repository.save(this.repository.create(data))
  }

  async save(profile: AgentProfilesEntity): Promise<AgentProfilesEntity> {
    return this.repository.save(profile)
  }

  async findAll(params: {
    page: number
    size: number
    key?: string
  }) {
    const query = this.repository
      .createQueryBuilder('agent_profiles')
      .where('agent_profiles.deleted_at IS NULL')

    if (params.key) {
      query.andWhere(
        '(agent_profiles.name LIKE :keyword OR agent_profiles.phone LIKE :keyword OR agent_profiles.license_number LIKE :keyword)',
        { keyword: `%${params.key}%` },
      )
    }

    query
      .orderBy('agent_profiles.created_at', 'DESC')
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

  async findById(id: number): Promise<AgentProfilesEntity | null> {
    return this.repository.findOne({
      where: { id, deleted_at: IsNull() },
    })
  }

  async update(id: number, data: Partial<AgentProfilesEntity>): Promise<void> {
    await this.repository.update(id, data)
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id)
  }

  async findByUserId(user_id: number): Promise<AgentProfilesEntity | null> {
    return this.repository.findOne({
      where: { user_id, deleted_at: IsNull() },
    })
  }

  async findByPhone(phone: string): Promise<AgentProfilesEntity | null> {
    return this.repository.findOne({
      where: { phone, deleted_at: IsNull() },
    })
  }
  async findByAgencyId(agency_id: number): Promise<AgentProfilesEntity[]> {
    return this.repository.find({
      where: { agency_id, deleted_at: IsNull() },
    })
  }

}