import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'

// import { RoleEntity } from './role.entity'

@Entity('transactions')
export class TransactionEntity extends BaseEntity {
  @Column({ type: 'nvarchar', length: 255 })
  name: string

  @Column({ type: 'nvarchar', length: 50})
  payment_gateway: string

  @Column({ type: 'nvarchar', length: 50})
  payment_method: string

  @Column({ type: 'nvarchar', length: 50})
  status: string

  @Column({ type: 'nvarchar', length: 50})
  response_code: string

  @Column({ type: 'nvarchar', length: 50 })
  message: string

  @Column({ type: 'nvarchar', length: 50,unique: true })
  transaction_reference: string

  @Column({ type: 'nvarchar', length: 50 })
  order_id: string

  @Column({ type: 'datetime'})
  payment_time: Date
  
@Column({ type: 'bit', default: false })
  ipn_received: boolean

  @Column({ type: 'nvarchar', length: 50 })
  currency: string

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  amount: number

  @Column({ type: 'int', nullable: true })
  property_id: number

  @Column({ type: 'int', nullable: true })
  buyer_id: number


  // @Column({ type: 'int', nullable: true })
  // role_id: number

}
