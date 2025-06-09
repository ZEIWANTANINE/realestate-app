import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'

// import { RoleEntity } from './role.entity'

@Entity('message_read')
export class MessageReadEntity extends BaseEntity {

  @Column({ type:'date', nullable: true })
  read_at:Date

  @Column({ type: 'int', nullable: true })
  message_id: number

  @Column({ type: 'int', nullable: true })
  user_id: number

}
