import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'

// import { RoleEntity } from './role.entity'

@Entity('messages')
export class MessageEntity extends BaseEntity {
  @Column({ type: 'nvarchar', length:255, nullable: true })
  message: string

  @Column({ type:'nvarchar', length:255, nullable: true })
  message_type:string | null

  @Column({ type:'nvarchar', length:255, nullable: true })
  media_url:string | null

  @Column({ type: 'int', nullable: true })
  conversation_id: number

  @Column({ type: 'int', nullable: true })
  sender_id: number

}
