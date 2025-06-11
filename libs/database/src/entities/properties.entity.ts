import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { PropertyMediaEntity } from './property_media.entity'
import { NearbyPlaceEntity } from './nearby_place.entity'

// import { RoleEntity } from './role.entity'

@Entity('properties')
export class PropertiesEntity extends BaseEntity {
  @Column({ type: 'nvarchar', length: 255 })
  title: string

  @Column({ type: 'nvarchar', length: 255, unique: true })
  description: string

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  address: string

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  price: number

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  city: string

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  state: string

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  country: string

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  zipcode: string

  @Column({ type: 'float', nullable: true })
  latitude: number

  @Column({ type: 'float', nullable: true })
  longtitude: number

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  property_type: string

  @Column({ type: 'int', nullable: true })
  bedrooms: number

  @Column({ type: 'int', nullable: true })
  bathrooms: number

  @Column({ type: 'float', nullable: true })
  area_size:number

  @Column({ type: 'int', nullable: true })
  year_built:number
  
  @Column({ type: 'int', nullable: true })
  floors:number

  @Column({ type: 'int', nullable: true })
  parking_spaces:number

  @Column({ type: 'bit', nullable: true })
  is_active:boolean

  @Column({ type: 'int', nullable: true })
  company_id: number

  @Column({ type: 'int', nullable: true })
  agent_id: number

  @OneToMany(() => PropertyMediaEntity, propertyMedia => propertyMedia.property)
  propertyMedias: PropertyMediaEntity[]

  @OneToMany(() => NearbyPlaceEntity, nearbyPlace => nearbyPlace.property)
  nearbyPlaces: NearbyPlaceEntity[]

  // @Column({ type: 'int', nullable: true })
  // role_id: number

  
}
