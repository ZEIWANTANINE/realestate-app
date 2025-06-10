import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { UserEntity } from '../entities/user.entity'

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async create(data: Partial<UserEntity>): Promise<UserEntity> {
    return this.repository.save(this.repository.create(data))
  }

  async save(user: UserEntity): Promise<UserEntity> {
    return this.repository.save(user)
  }

  async findAll(params: {
    page: number
    size: number
    key?: string
  }) {
    const query = this.repository
      .createQueryBuilder('users')
      .where('users.deleted_at IS NULL')

    if (params.key) {
      query.andWhere(
        'users.email LIKE :keyword',
        { keyword: `%${params.key}%` },
      )
    }
    query
      .orderBy('users.created_at', 'DESC')
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

  async findById(id: number): Promise<UserEntity | null> {
    return this.repository.findOne({
      where: { id, deleted_at: IsNull() },
    })
  }

  async update(id: number, data: Partial<UserEntity>): Promise<void> {
    await this.repository.update(id, data)
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id)
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.repository.findOne({
      where: { email, deleted_at: IsNull() },
    })
  }

  async findUserActiveForLogin(loginInfo: string) {
    return this.repository
      .createQueryBuilder('users')
      .where('users.email = :loginInfo', { loginInfo })
      .getOne()
  }
}