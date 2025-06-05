import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'

// import { RoleEntity } from './role.entity'

@Entity('property_price_history')
export class PropertyPriceHistoryEntity extends BaseEntity {
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  price: number

  @Column({ type: 'date', nullable: true })
  recorded_at: Date

  @Column({ type: 'int', nullable: true })
  property_id: number

  // @Column({ type: 'int', nullable: true })
  // role_id: number

  
}
