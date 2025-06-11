import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { PropertiesEntity } from './properties.entity'

// import { RoleEntity } from './role.entity'

@Entity('property_media')
export class PropertyMediaEntity extends BaseEntity {
  @Column({ type: 'nvarchar', length: 255 })
  media_type: string

  @Column({ type: 'nvarchar', length: 50})
  media_url: string

  @Column({ type: 'nvarchar', length: 50 })
  caption: string

  @Column({ type: 'int', nullable: true })
  property_id: number

  @ManyToOne(() => PropertiesEntity, property => property.propertyMedias)
  @JoinColumn({ name: 'property_id' })
  property: PropertiesEntity
}
