import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@app/common';
import { PropertyRepository, PropertyFeatureRepository } from '@app/database';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ICreatePropertyFeature, IListPropertyFeature, IUpdatePropertyfeature } from './property_features.interface';

@Injectable()
export class PropertyFeaturesService {
constructor(
            private readonly propertyRepository: PropertyRepository,
            private readonly propertyFeatureRepository: PropertyFeatureRepository,
                    ){}
                    async create(data: ICreatePropertyFeature) {
                      if (typeof data.property_id !== 'number') {
                        throw new NotFoundException('Property not found');
                      }
                        const property = await this.propertyRepository.findById(data.property_id);
                        if (!property) {
                          throw new NotFoundException('Property not found');
                        }
                        const propertyfeature = this.propertyFeatureRepository.create({
                          property_id: data.property_id,
                            heating_type: data.heating_type,
                            cooling_type: data.cooling_type,
                            furnished: data.furnished,
                        });
                        return propertyfeature;
                      }
                    
                      async findAll(params: IListPropertyFeature) {
                        return this.propertyFeatureRepository.findAll({
                          page: params.page || DEFAULT_PAGE,
                          size: params.size || DEFAULT_PAGE_SIZE,
                          property_id: params.property_id, 
                        })
                      }
                    
                      async findOne(id: number) {
                        const propertyfeature = await this.propertyFeatureRepository.findById(id)
                        if (!propertyfeature) return null
                        return propertyfeature
                      }
                    
                      async update(id: number, data: IUpdatePropertyfeature) {
                        if ( typeof data.property_id !== 'number') {
                            throw new NotFoundException(' Property not found');
                          }
                        const property = await this.propertyRepository.findById(data.property_id);
                        if ( !property) return null;
                        await this.propertyFeatureRepository.update(id, {
                          property_id: data.property_id,
                            heating_type: data.heating_type,
                            cooling_type: data.cooling_type,
                            furnished: data.furnished,
                        });
                        return this.findOne(id);
                      }
                    
        async softDelete(id: number) {
            const propertyfeature = await this.propertyFeatureRepository.findById(id)
            if (!propertyfeature) return null
            return this.propertyFeatureRepository.softDelete(id)
        }
}
