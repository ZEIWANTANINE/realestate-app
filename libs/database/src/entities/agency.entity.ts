import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { AgentProfilesEntity } from './agent_profiles.entity'

// import { RoleEntity } from './role.entity'

@Entity('agency')
export class AgencyEntity extends BaseEntity {
  @Column({ type: 'nvarchar', length: 255 })
  name: string

  @Column({ type: 'nvarchar', length: 255})
  logo_urls: string

  @Column({ type: 'nvarchar', length: 255 })
  address: string

  @Column({ type: 'nvarchar', length: 10, nullable: true })
  phone: string

  @Column({ type: 'nvarchar',length:255, nullable: true })
  website: string
  
  @Column({ type: 'nvarchar',length:255, nullable: true })
  description:string

  @Column({ type: 'int', nullable: true })
  user_id: number

  @Column({ type: 'int', nullable: true })
  agency_id: number
  
  @OneToMany(() => AgentProfilesEntity, (agent) => agent.agency)
  agent_profiles: AgentProfilesEntity[]

  
}
