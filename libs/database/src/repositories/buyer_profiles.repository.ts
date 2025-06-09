import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { BuyerProfilesEntity } from '../entities/buyer_profiles.entity'

@Injectable()
export class BuyerProfilesRepository {
  constructor(
    @InjectRepository(BuyerProfilesEntity)
    private readonly repository: Repository<BuyerProfilesEntity>,
  ) {}

  async create(data: Partial<BuyerProfilesEntity>): Promise<BuyerProfilesEntity> {
    return this.repository.save(this.repository.create(data))
  }

  async save(profile: BuyerProfilesEntity): Promise<BuyerProfilesEntity> {
    return this.repository.save(profile)
  }

  async findAll(params: {
    page: number
    size: number
    key?: string
  }) {
    const query = this.repository
      .createQueryBuilder('buyer_profiles')
      .where('buyer_profiles.deleted_at IS NULL')

    if (params.key) {
      query.andWhere(
        '(buyer_profiles.name LIKE :keyword OR buyer_profiles.phone LIKE :keyword)',
        { keyword: `%${params.key}%` },
      )
    }

    query
      .orderBy('buyer_profiles.created_at', 'DESC')
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

  async findById(id: number): Promise<BuyerProfilesEntity | null> {
    return this.repository.findOne({
      where: { id, deleted_at: IsNull() },
    })
  }

  async update(id: number, data: Partial<BuyerProfilesEntity>): Promise<void> {
    await this.repository.update(id, data)
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id)
  }

  async findByUserId(user_id: number): Promise<BuyerProfilesEntity | null> {
    return this.repository.findOne({
      where: { user_id, deleted_at: IsNull() },
    })
  }

  async findByPhone(phone: string): Promise<BuyerProfilesEntity | null> {
    return this.repository.findOne({
      where: { phone, deleted_at: IsNull() },
    })
  }
}