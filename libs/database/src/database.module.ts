import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'

import {
  UserEntity,
  BuyerProfilesEntity,
  AgencyEntity,
  AgentProfilesEntity,
  CompanyEntity,
} from './entities'
import {
  UserRepository,
  BuyerProfilesRepository,
  AgentProfilesRepository,
  AgencyRepository,
  CompanyRepository,
} from './repositories'
import { config } from 'dotenv'

const mssqlRepositories = [
  UserRepository,
  BuyerProfilesRepository,
  AgentProfilesRepository,
  AgencyRepository,
  CompanyRepository,
]
const mssqlEntities = [
  UserEntity,
  BuyerProfilesEntity,
  AgencyEntity,
  AgentProfilesEntity,
  CompanyEntity
]
config()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 1433,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: false,
      logging: true,
      entities: [...mssqlEntities],
      options: {
        encrypt: false,
      },
    }),
    TypeOrmModule.forFeature([...mssqlEntities]),
  ],
  providers: [...mssqlRepositories],
  exports: [TypeOrmModule, ...mssqlRepositories]
})
export class DatabaseModule {}
