import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@app/common';
import { PropertyRepository, PropertyMediaRepository } from '@app/database';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ICreatePropertyMedia, IListPropertyMedia, IUpdatePropertyMedia } from './property_media.interface';

@Injectable()
export class PropertyMediaService {
        constructor(
            private readonly propertyRepository: PropertyRepository,
            private readonly propertyMediaRepository: PropertyMediaRepository,
                    ){}
                    async create(data: ICreatePropertyMedia) {
                      if (typeof data.property_id !== 'number') {
                        throw new NotFoundException('Property not found');
                      }
                        const property = await this.propertyRepository.findById(data.property_id);
                        if (!property) {
                          throw new NotFoundException('Property not found');
                        }
                        const propertymedia = this.propertyMediaRepository.create({
                          property_id: data.property_id,
                            media_type: data.media_type,
                            media_url: data.media_url,
                            caption: data.caption,
                        });
                        return propertymedia;
                      }
                    
                      async findAll(params: IListPropertyMedia) {
                        return this.propertyMediaRepository.findAll({
                          page: params.page || DEFAULT_PAGE,
                          size: params.size || DEFAULT_PAGE_SIZE,
                          property_id: params.property_id, 
                        })
                      }
                    
                      async findOne(id: number) {
                        const propertymedia = await this.propertyMediaRepository.findById(id)
                        if (!propertymedia) return null
                        return propertymedia
                      }
                    
                      async update(id: number, data: IUpdatePropertyMedia) {
                        if ( typeof data.property_id !== 'number') {
                            throw new NotFoundException(' Property not found');
                          }
                        const property = await this.propertyRepository.findById(data.property_id);
                        if ( !property) return null;
                        await this.propertyMediaRepository.update(id, {
                          property_id: data.property_id,
                            media_type: data.media_type,
                            media_url: data.media_url,
                            caption: data.caption,
                        });
                        return this.findOne(id);
                      }
                    
        async softDelete(id: number) {
            const propertymedia = await this.propertyMediaRepository.findById(id)
            if (!propertymedia) return null
            return this.propertyMediaRepository.softDelete(id)
        }
}
