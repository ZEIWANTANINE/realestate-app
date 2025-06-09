import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity('conversations')
export class ConversationEntity extends BaseEntity {
  @Column({ type: 'nvarchar', length:255, nullable: true })
  type: string

  @Column({ type:'nvarchar',length:255, nullable: true })
  name: string
}
