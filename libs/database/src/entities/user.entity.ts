import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'

// import { RoleEntity } from './role.entity'

@Entity('users')
export class UserEntity extends BaseEntity {

  @Column({ type: 'nvarchar', length: 255, unique: true })
  email: string

  @Column({ type: 'nvarchar', length: 255 })
  password: string

  @Column({ type: 'nvarchar', length: 255 })
  role: string

}
