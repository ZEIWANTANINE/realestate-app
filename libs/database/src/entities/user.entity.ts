import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'

// import { RoleEntity } from './role.entity'

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ type: 'nvarchar', length: 255 })
  name: string

  @Column({ type: 'nvarchar', length: 255, unique: true })
  email: string

  @Column({ type: 'nvarchar', length: 20, unique: true })
  phone: string

  @Column({ type: 'nvarchar', length: 10 })
  gender: string

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  password: string

  @Column({ type: 'int', nullable: true })
  organization_id: number

  // @Column({ type: 'int', nullable: true })
  // role_id: number

  @Column({ type: 'nvarchar', length: 255, nullable: false })
  role: string

  @Column({ type: 'nvarchar', length: 100, nullable: false, unique: true })
  code: string

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  level: string

  @Column({ type: 'float', nullable: true })
  hour_target: number
}
