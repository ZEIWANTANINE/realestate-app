import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { NearbyPlaceEntity } from '../entities/nearby_place.entity'

@Injectable()
export class NearbyPlacesRepository {
  constructor(
    @InjectRepository(NearbyPlaceEntity)
    private readonly repository: Repository<NearbyPlaceEntity>,
  ) {}

  async create(data: Partial<NearbyPlaceEntity>): Promise<NearbyPlaceEntity> {
    return this.repository.save(this.repository.create(data))
  }

  async save(place: NearbyPlaceEntity): Promise<NearbyPlaceEntity> {
    return this.repository.save(place)
  }

  async findAll(params: {
    page: number
    size: number
    key?: string
    place_type?: string
  }) {
    const query = this.repository
      .createQueryBuilder('nearby_places')
      .where('nearby_places.deleted_at IS NULL')

    if (params.key) {
      query.andWhere(
        '(nearby_places.name LIKE :keyword OR nearby_places.address LIKE :keyword OR nearby_places.description LIKE :keyword)',
        { keyword: `%${params.key}%` },
      )
    }
    if (params.place_type) {
      query.andWhere('nearby_places.place_type = :place_type', { place_type: params.place_type })
    }

    query
      .orderBy('nearby_places.created_at', 'DESC')
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

  async findById(id: number): Promise<NearbyPlaceEntity | null> {
    return this.repository.findOne({
      where: { id, deleted_at: IsNull() },
    })
  }

  async update(id: number, data: Partial<NearbyPlaceEntity>): Promise<void> {
    await this.repository.update(id, data)
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id)
  }
}