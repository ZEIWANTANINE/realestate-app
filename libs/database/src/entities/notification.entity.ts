import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'

// import { RoleEntity } from './role.entity'

@Entity('notifications')
export class NotificationEntity extends BaseEntity {
  @Column({ type: 'nvarchar', length: 255, nullable: true })
  type: string

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  title: string

  @Column({ type: 'nvarchar', length: 500, nullable: true })
  content: string

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  data: string

  @Column({ type: 'int', nullable: true })
  user_id: number

  @Column({ type: 'bit', default: false })
  is_read: boolean

  @Column({ type: 'date', nullable: true })
  read_at: Date

  // @Column({ type: 'int', nullable: true })
  // role_id: number

}
