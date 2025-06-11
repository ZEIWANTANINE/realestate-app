import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@app/common';
import { UserRepository, PropertyRepository, ViewingRepository } from '@app/database';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ICreateViewing, IListViewing, IUpdateViewing } from './viewing.interface';

@Injectable()
export class ViewingService {
constructor(
            private readonly userRepository: UserRepository,
            private readonly propertyRepository: PropertyRepository,
            private readonly viewingRepository: ViewingRepository,
                    ){}
                    async create(data: ICreateViewing) {
                      if (typeof data.buyer_id !== 'number' || typeof data.property_id !== 'number') {
                        throw new NotFoundException('User or Property not found');
                      }
                        const buyer = await this.userRepository.findById(data.buyer_id);
                        const property = await this.propertyRepository.findById(data.property_id);
                        if (!buyer || !property) {
                          throw new NotFoundException('User or Property not found');
                        }
                        const viewing = this.viewingRepository.create({
                          buyer_id: data.buyer_id,
                          property_id: data.property_id,
                          schedule_date: data.schedule_date,
                          status: data.status,
                        });
                        return viewing;
                      }
                    
                      async findAll(params: IListViewing) {
                        return this.viewingRepository.findAll({
                          page: params.page || DEFAULT_PAGE,
                          size: params.size || DEFAULT_PAGE_SIZE,
                          buyer_id: params.buyer_id, 
                          property_id: params.property_id, 
                          status: params.status,
                        })
                      }
                    
                      async findOne(id: number) {
                        const viewing = await this.viewingRepository.findById(id)
                        if (!viewing) return null
                        return viewing
                      }
                    
                      async update(id: number, data: IUpdateViewing) {
                        if (typeof data.buyer_id !== 'number' || typeof data.property_id !== 'number') {
                            throw new NotFoundException('User or Property not found');
                          }
                        const buyer = await this.userRepository.findById(data.buyer_id);
                        const property = await this.propertyRepository.findById(data.property_id);
                        if (!buyer || !property) return null;
                        await this.viewingRepository.update(id, {
                          buyer_id: data.buyer_id,
                          property_id: data.property_id,
                          schedule_date: data.schedule_date,
                          status: data.status,
                        });
                        return this.findOne(id);
                      }
                    
        async softDelete(id: number) {
            const viewing = await this.viewingRepository.findById(id)
            if (!viewing) return null
            return this.viewingRepository.softDelete(id)
        }
}
