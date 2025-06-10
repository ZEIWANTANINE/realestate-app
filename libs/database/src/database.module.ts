import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'

import {
  UserEntity,
  BuyerProfilesEntity,
  AgencyEntity,
  AgentProfilesEntity,
  CompanyEntity,
  ConversationParticipantEntity,
  ConversationEntity,
  FavouritesEntity,
  MessageEntity,
  MessageReadEntity,
  NotificationEntity,
  PropertyFeaturesEntity,
  PropertyMediaEntity,
  PropertyPriceHistoryEntity,
  TransactionEntity,
  ViewingEntity,
  NearbyPlaceEntity,
  PropertiesEntity

} from './entities'
import {
  UserRepository,
  BuyerProfilesRepository,
  AgentProfilesRepository,
  AgencyRepository,
  CompanyRepository,
  PropertyRepository,
  FavouriteRepository,
  ConversationRepository,
  ConversationParticipantRepository,
  MessageReadRepository,
  MessageRepository,
  NearbyPlacesRepository,
  NewRepository,
  NotificationRepository,
  PropertyFeatureRepository,
  PropertyMediaRepository,
  PropertyPriceHistoryRepository,
  TransactionRepository,
  ViewingRepository,
} from './repositories'
import { config } from 'dotenv'
import { NewEntity } from './entities/new.entity';

const mssqlRepositories = [
  UserRepository,
  BuyerProfilesRepository,
  AgentProfilesRepository,
  AgencyRepository,
  CompanyRepository,
  PropertyRepository,
  FavouriteRepository,
  ConversationRepository,
  ConversationParticipantRepository,
  FavouriteRepository,
  MessageReadRepository,
  MessageRepository,
  NearbyPlacesRepository,
  NewRepository,
  NotificationRepository,
  PropertyPriceHistoryRepository,
  PropertyFeatureRepository,
  PropertyMediaRepository,
  PropertyRepository,
  TransactionRepository,
  ViewingRepository
]
const mssqlEntities = [
  UserEntity,
  BuyerProfilesEntity,
  AgencyEntity,
  AgentProfilesEntity,
  CompanyEntity,
  ConversationParticipantEntity,
  ConversationEntity,
  FavouritesEntity,
  MessageReadEntity,
  MessageEntity,
  NearbyPlaceEntity,
  NewEntity,
  NotificationEntity,
  PropertyFeaturesEntity,
  PropertyMediaEntity,
  PropertyPriceHistoryEntity,
  TransactionEntity,
  ViewingEntity,
  PropertiesEntity
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
