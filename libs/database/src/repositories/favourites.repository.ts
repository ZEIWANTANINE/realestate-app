import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { FavouritesEntity } from '../entities/favourite.entity'

@Injectable()
export class FavouriteRepository {
  constructor(
    @InjectRepository(FavouritesEntity)
    private readonly repository: Repository<FavouritesEntity>,
  ) {}

  async create(data: Partial<FavouritesEntity>): Promise<FavouritesEntity> {
    return this.repository.save(this.repository.create(data))
  }

  async save(favourite: FavouritesEntity): Promise<FavouritesEntity> {
    return this.repository.save(favourite)
  }

  async findAll(params: {
    page: number
    size: number
    user_id?: number
    property_id?: number
  }) {
    const query = this.repository
      .createQueryBuilder('favourites')
      .where('favourites.deleted_at IS NULL')

    if (params.user_id) {
      query.andWhere('favourites.user_id = :user_id', { user_id: params.user_id })
    }
    if (params.property_id) {
      query.andWhere('favourites.property_id = :property_id', { property_id: params.property_id })
    }

    query
      .orderBy('favourites.created_at', 'DESC')
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

  async findById(id: number): Promise<FavouritesEntity | null> {
    return this.repository.findOne({
      where: { id, deleted_at: IsNull() },
    })
  }

  async update(id: number, data: Partial<FavouritesEntity>): Promise<void> {
    await this.repository.update(id, data)
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id)
  }

  async findByUserAndProperty(user_id: number, property_id: number): Promise<FavouritesEntity | null> {
    return this.repository.findOne({
      where: { user_id, property_id, deleted_at: IsNull() },
    })
  }
}