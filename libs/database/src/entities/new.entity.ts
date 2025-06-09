import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'

// import { RoleEntity } from './role.entity'

@Entity('news')
export class NewEntity extends BaseEntity {
  @Column({ type: 'nvarchar', length:255, nullable: true })
  title: string

  @Column({ type:'nvarchar',length:255, nullable: true })
  context: string

  @Column({ type:'nvarchar',length:255, nullable: true })
  thumbnail_url: string

  @Column({ type:'nvarchar',length:255, nullable: true })
  source_url:string

  @Column({ type:'date', nullable: true })
  published_at:Date

  @Column({ type:'nvarchar',length:255, nullable: true })
  tag:string

  @Column({ type: 'int', nullable: true })
  user_id: number
}
