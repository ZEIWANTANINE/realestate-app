import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'

// import { RoleEntity } from './role.entity'

@Entity('agent_profiles')
export class AgentProfilesEntity extends BaseEntity {
  @Column({ type: 'nvarchar', length: 255 })
  name: string

  @Column({ type: 'nvarchar', length: 20, unique: true })
  phone: string

  @Column({ type: 'nvarchar', length: 10 })
  license_number: string

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  avatar_url: string

  @Column({ type: 'decimal', precision: 2, scale: 1, nullable: true })
  rating: number

  @Column({ type: 'int', nullable: true })
  user_id: number

  @Column({ type: 'int', nullable: true })
  agency_id: number

  // @Column({ type: 'int', nullable: true })
  // role_id: number

  
}
