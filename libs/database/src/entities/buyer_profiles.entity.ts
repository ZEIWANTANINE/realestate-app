import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { UserEntity } from './user.entity'

// import { RoleEntity } from './role.entity'

@Entity('buyer_profiles')
export class BuyerProfilesEntity extends BaseEntity {
  @Column({ type: 'nvarchar', length: 255 })
  name: string

  @Column({ type: 'nvarchar', length: 20, unique: true })
  phone: string

  @Column({ type: 'nvarchar', length: 255 })
  avatar_url: string

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  prefered_location: string

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  budget: number

  @Column({ type: 'int', nullable: true })
  user_id: number

  @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user_id_info: UserEntity

}
