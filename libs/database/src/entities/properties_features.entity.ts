import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'

// import { RoleEntity } from './role.entity'

@Entity('property_features')
export class PropertyFeaturesEntity extends BaseEntity {
  @Column({ type: 'nvarchar', length: 50})
  heating_type: string

  @Column({ type: 'nvarchar', length: 50 })
  cooling_type: string

  @Column({ type: 'bit', nullable: true })
  furnished: boolean

  @Column({ type: 'int', nullable: true })
  property_id: number

}
