import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@app/common';
import { NearbyPlacesRepository, PropertyRepository } from '@app/database';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ICreateNearbyPlace, IListNearbyPlace, IUpdateNearbyPlace } from './nearby_place.interface';

@Injectable()
export class NearbyPlaceService {
    constructor(
                private readonly propertyRepository: PropertyRepository,
                private readonly nearbyPlaceRepository: NearbyPlacesRepository,
                        ){}
                        async create(data: ICreateNearbyPlace) {
                          if (typeof data.property_id !== 'number') {
                            throw new NotFoundException('Property not found');
                          }
                            const property = await this.propertyRepository.findById(data.property_id);
                            if (!property) {
                              throw new NotFoundException('Property not found');
                            }
                            const propertyfeature = this.nearbyPlaceRepository.create({
                              property_id: data.property_id,
                                place_type:data.place_type,
                                name: data.name,
                                address: data.address,
                                latitude: data.latitude,
                                longtitude: data.longtitude,
                                distance : data.distance,
                                icon_url : data.icon_url,
                            });
                            return propertyfeature;
                          }
                        
                          async findAll(params: IListNearbyPlace) {
                            return this.nearbyPlaceRepository.findAll({
                              page: params.page || DEFAULT_PAGE,
                              size: params.size || DEFAULT_PAGE_SIZE,
                            })
                          }
                        
                          async findOne(id: number) {
                            const propertyfeature = await this.nearbyPlaceRepository.findById(id)
                            if (!propertyfeature) return null
                            return propertyfeature
                          }
                        
                          async update(id: number, data: IUpdateNearbyPlace) {
                            if ( typeof data.property_id !== 'number') {
                                throw new NotFoundException(' Property not found');
                              }
                            const property = await this.propertyRepository.findById(data.property_id);
                            if ( !property) return null;
                            await this.nearbyPlaceRepository.update(id, {
                              property_id: data.property_id,
                                place_type:data.place_type,
                                name: data.name,
                                address: data.address,
                                latitude: data.latitude,
                                longtitude: data.longtitude,
                                distance : data.distance,
                                icon_url : data.icon_url,
                            });
                            return this.findOne(id);
                          }
                        
            async softDelete(id: number) {
                const propertyfeature = await this.nearbyPlaceRepository.findById(id)
                if (!propertyfeature) return null
                return this.nearbyPlaceRepository.softDelete(id)
            }
}
