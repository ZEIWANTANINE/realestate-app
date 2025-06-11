import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { PropertiesEntity } from './properties.entity'

// import { RoleEntity } from './role.entity'

@Entity('nearby_places')
export class NearbyPlaceEntity extends BaseEntity {
  @Column({ type: 'nvarchar', length:255, nullable: true })
  place_type: string

  @Column({ type:'nvarchar',length:255, nullable: true })
  name: string

  @Column({ type:'nvarchar',length:255, nullable: true })
  address: string

  @Column({ type:'float', nullable: true })
  latitude:number

  @Column({ type:'float', nullable: true })
  longtitude:number

  @Column({ type:'float', nullable: true })
  distance:number
  
  @Column({ type:'nvarchar',length:255, nullable: true })
  icon_url:string

  @Column({ type: 'int', nullable: true })
  property_id: number

  @ManyToOne(() => PropertiesEntity, property => property.nearbyPlaces)
  @JoinColumn({ name: 'property_id' })
  property: PropertiesEntity
}
