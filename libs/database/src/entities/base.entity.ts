import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  } from 'typeorm'
  
  export abstract class BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number
  
    @CreateDateColumn({ type: 'datetime', default: () => 'GETDATE()' })
    created_at: Date
  
    @UpdateDateColumn({
      type: 'datetime',
      default: () => 'GETDATE()',
      onUpdate: 'GETDATE()',
    })
    updated_at: Date
  
    @DeleteDateColumn({ type: 'datetime', nullable: true })
    deleted_at: Date | null
  }
  