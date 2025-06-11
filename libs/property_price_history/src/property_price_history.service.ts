import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@app/common';
import { PropertyPriceHistoryRepository, PropertyRepository } from '@app/database';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ICreatePropertyPriceHistory, IListPropertyPriceHistory, IUpdatePropertyPriceHistory } from './property_price_history.interface';

@Injectable()
export class PropertyPriceHistoryService {
constructor(
            private readonly propertyRepository: PropertyRepository,
            private readonly propertypriceHistoryRepository: PropertyPriceHistoryRepository,
                    ){}
                    async create(data: ICreatePropertyPriceHistory) {
                      if (typeof data.property_id !== 'number') {
                        throw new NotFoundException('User or Property not found');
                      }
                        const property = await this.propertyRepository.findById(data.property_id);
                        if (!property) {
                          throw new NotFoundException('User or Property not found');
                        }
                        const propertyprice = this.propertypriceHistoryRepository.create({
                          property_id: data.property_id,
                            recorded_at: data.recorded_at,
                            price: data.price,
                        });
                        return propertyprice;
                      }
                    
                      async findAll(params: IListPropertyPriceHistory) {
                        return this.propertypriceHistoryRepository.findAll({
                          page: params.page || DEFAULT_PAGE,
                          size: params.size || DEFAULT_PAGE_SIZE,
                          property_id: params.property_id, 
                        })
                      }
                    
                      async findOne(id: number) {
                        const propertyprice = await this.propertypriceHistoryRepository.findById(id)
                        if (!propertyprice) return null
                        return propertyprice
                      }
                    
                      async update(id: number, data: IUpdatePropertyPriceHistory) {
                        if ( typeof data.property_id !== 'number') {
                            throw new NotFoundException('User or Property not found');
                          }
                        const property = await this.propertyRepository.findById(data.property_id);
                        if ( !property) return null;
                        await this.propertypriceHistoryRepository.update(id, {
                          property_id: data.property_id,
                            recorded_at: data.recorded_at,
                            price: data.price,
                        });
                        return this.findOne(id);
                      }
                    
        async softDelete(id: number) {
            const propertyprice = await this.propertypriceHistoryRepository.findById(id)
            if (!propertyprice) return null
            return this.propertypriceHistoryRepository.softDelete(id)
        }
}
