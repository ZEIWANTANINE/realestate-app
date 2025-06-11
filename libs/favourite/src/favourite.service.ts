import { PropertyRepository } from '@app/database/repositories/property.repository';
import { UserRepository } from '@app/database/repositories/user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ICreateFavourite, IListFavourite, IUpdateFavourite } from './favourite.interface';
import { FavouriteRepository } from '@app/database';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@app/common';

@Injectable()
export class FavouriteService {
    constructor(
            private readonly userRepository: UserRepository,
            private readonly propertyRepository: PropertyRepository,
            private readonly favouriteRepository: FavouriteRepository,
                    ){}
                    async create(data: ICreateFavourite) {
                      if (typeof data.user_id !== 'number' || typeof data.property_id !== 'number') {
                        throw new NotFoundException('User or Property not found');
                      }
                        const user = await this.userRepository.findById(data.user_id);
                        const property = await this.propertyRepository.findById(data.property_id);
                        if (!user || !property) {
                          throw new NotFoundException('User or Property not found');
                        }
                        const favourite = this.favouriteRepository.create({
                          user_id: data.user_id,
                          property_id: data.property_id,
                        });
                        return favourite;
                      }
                    
                      async findAll(params: IListFavourite) {
                        return this.favouriteRepository.findAll({
                          page: params.page || DEFAULT_PAGE,
                          size: params.size || DEFAULT_PAGE_SIZE,
                          user_id: params.user_id, // Pass user_id
                          property_id: params.property_id, // Pass property_id
                        })
                      }
                    
                      async findOne(id: number) {
                        const favourite = await this.favouriteRepository.findById(id)
                        if (!favourite) return null
                        return favourite
                      }
                    
                      async update(id: number, data: IUpdateFavourite) {
                        if (typeof data.user_id !== 'number' || typeof data.property_id !== 'number') {
                            throw new NotFoundException('User or Property not found');
                          }
                        const user = await this.userRepository.findById(data.user_id);
                        const property = await this.propertyRepository.findById(data.property_id);
                        if (!user || !property) return null;
                        await this.favouriteRepository.update(id, {
                          user_id: data.user_id,
                          property_id: data.property_id,
                        });
                        return this.findOne(id);
                      }
                    
        async softDelete(id: number) {
            const favourite = await this.favouriteRepository.findById(id)
            if (!favourite) return null
            return this.favouriteRepository.softDelete(id)
        }
}
