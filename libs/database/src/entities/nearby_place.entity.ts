import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'

// import { RoleEntity } from './role.entity'

@Entity('nearby_place')
export class NearbyPlaceEntity extends BaseEntity {
  @Column({ type: 'string', length:255, nullable: true })
  place_type: string

  @Column({ type:'string',length:255, nullable: true })
  name: string

  @Column({ type:'string',length:255, nullable: true })
  address: string

  @Column({ type:'string',length:255, nullable: true })
  latitude:string

  @Column({ type:'string',length:255, nullable: true })
  longtitude:string

  @Column({ type:'float',length:255, nullable: true })
  distance:number
  
  @Column({ type:'string',length:255, nullable: true })
  icon_url:string

  @Column({ type: 'int', nullable: true })
  property_id: number

  // @Column({ type: 'int', nullable: true })
  // role_id: number

  
}
