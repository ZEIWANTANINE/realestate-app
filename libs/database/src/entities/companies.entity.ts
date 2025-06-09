import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'

// import { RoleEntity } from './role.entity'

@Entity('company')
export class CompanyEntity extends BaseEntity {
  @Column({ type: 'nvarchar', length:255, nullable: true })
  name: string

  @Column({ type:'nvarchar',length:255, nullable: true })
  industry: string

  @Column({ type:'nvarchar',length:255, nullable: true })
  email: string

  @Column({ type:'nvarchar',length:10, nullable: true })
  phone:string

  @Column({ type:'nvarchar',length:255, nullable: true })
  address:string

  @Column({ type:'nvarchar',length:255, nullable: true })
  description:string

  @Column({ type:'nvarchar',length:255, nullable: true })
  website:string

  @Column({ type:'nvarchar',length:255, nullable: true })
  logo_url:string
}
