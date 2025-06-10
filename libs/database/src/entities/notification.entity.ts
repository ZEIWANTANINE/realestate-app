import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'

// import { RoleEntity } from './role.entity'

@Entity('notifications')
export class NotificationEntity extends BaseEntity {
  @Column({ type: 'nvarchar', length: 255 })
  title: string

  @Column({ type: 'nvarchar', length: 50})
  message: string

  @Column({ type: 'nvarchar', length: 50})
  type: string

  @Column({ type: 'bit', default: false })
  is_read: boolean

  @Column({ type: 'int', nullable: true })
  user_id: number

  // @Column({ type: 'int', nullable: true })
  // role_id: number

}
