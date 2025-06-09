import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { TransactionEntity } from '../entities/transaction.entity'

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly repository: Repository<TransactionEntity>,
  ) {}

  async create(data: Partial<TransactionEntity>): Promise<TransactionEntity> {
    return this.repository.save(this.repository.create(data))
  }

  async save(transaction: TransactionEntity): Promise<TransactionEntity> {
    return this.repository.save(transaction)
  }

  async findAll(params: {
    page: number
    size: number
    property_id?: number
    buyer_id?: number
    status?: string
  }) {
    const query = this.repository
      .createQueryBuilder('transactions')
      .where('transactions.deleted_at IS NULL')

    if (params.property_id) {
      query.andWhere('transactions.property_id = :property_id', { property_id: params.property_id })
    }
    if (params.buyer_id) {
      query.andWhere('transactions.buyer_id = :buyer_id', { buyer_id: params.buyer_id })
    }
    if (params.status) {
      query.andWhere('transactions.status = :status', { status: params.status })
    }

    query
      .orderBy('transactions.created_at', 'DESC')
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

  async findById(id: number): Promise<TransactionEntity | null> {
    return this.repository.findOne({
      where: { id, deleted_at: IsNull() },
    })
  }

  async update(id: number, data: Partial<TransactionEntity>): Promise<void> {
    await this.repository.update(id, data)
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id)
  }
}