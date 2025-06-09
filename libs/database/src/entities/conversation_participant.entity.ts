import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'

// import { RoleEntity } from './role.entity'

@Entity('conversation_participants')
export class ConversationParticipantEntity extends BaseEntity {
  @Column({ type: 'nvarchar', length:255, nullable: true })
  role: string

  @Column({ type:'date', nullable: true })
  joined_at:Date

  @Column({ type: 'int', nullable: true })
  conversation_id: number

  @Column({ type: 'int', nullable: true })
  user_id: number
}
