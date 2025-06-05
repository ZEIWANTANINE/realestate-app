import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'

// import { RoleEntity } from './role.entity'

@Entity('favourites')
export class FavouritesEntity extends BaseEntity {
  @Column({type:'int',nullable:true})
  property_id: number

  @Column({ type: 'int', nullable: true })
  user_id: number

  // @Column({ type: 'int', nullable: true })
  // role_id: number

}
