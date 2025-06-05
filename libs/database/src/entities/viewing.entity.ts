import { Entity, Column, JoinColumn, ManyToOne, OneToMany, Timestamp } from 'typeorm'
import { BaseEntity } from './base.entity'

// import { RoleEntity } from './role.entity'

@Entity('viewing')
export class ViewingEntity extends BaseEntity {

  @Column({ type: 'string', length:'255', nullable: true })
  status: string

  @Column({ type: 'int', nullable: true })
  property_id: number

  @Column({ type: 'int', nullable: true })
  buyer_id: number

  @Column({ type: 'date', nullable: true })
  scheduled_date:Date

  // @Column({ type: 'int', nullable: true })
  // role_id: number

}
