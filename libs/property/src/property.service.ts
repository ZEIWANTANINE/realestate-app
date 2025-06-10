import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE } from '@app/common';
import { AgentProfilesRepository, CompanyRepository, NewRepository, PropertiesEntity, PropertyRepository } from '@app/database';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ICreateProperty, IUpdateProperty } from './property.interface';

@Injectable()
export class PropertyService {
    constructor(
        private readonly propertyRepository: PropertyRepository,
        private readonly agentProfilesRepository: AgentProfilesRepository,
        private readonly companyRepository: CompanyRepository
    ) {}
        async create(data: ICreateProperty) {
        const agent = await this.agentProfilesRepository.findById(data.agent_id)
        const company = await this.companyRepository.findById(data.company_id)
        if (!agent || !company) {
            throw new NotFoundException('Author not found')
        }
        const property = await this.propertyRepository.create({
                agent_id: data.agent_id,
                company_id: data.company_id,
                title: data.title,
                description: data.description,
                price: data.price,
                address: data.address,
                city: data.city,
                state: data.state,
                country: data.country,
                zipcode: data.zipcode,
                latitude: data.latitude,
                longtitude: data.longtitude,
                property_type: data.property_type,
                bedrooms: data.bedrooms,
                bathrooms: data.bathrooms,
                area_size: data.area_size,
                year_built: data.year_built,
                floors: data.floors,
                parking_spaces: data.parking_spaces,
                is_active: data.is_active,
                })
                return property
              }
            
        async findAll(params: ICreateProperty) {
        return this.propertyRepository.findAll({
                  ...params,
                  size: params.size || DEFAULT_PAGE_SIZE,
                  page: params.page || DEFAULT_PAGE,
                })
              }
            
        async findOne(id: number) {
                const property = await this.propertyRepository.findById(id)
                if (!property) throw new NotFoundException('news not found')
                return property
              }
            
        async update(id: number, data: IUpdateProperty) {
            const agent = await this.agentProfilesRepository.findById(data.agent_id)
            const company = await this.companyRepository.findById(data.company_id)
            if (!agent || !company) {
                throw new NotFoundException('Author not found')
            }
                const property = {
                agent_id: data.agent_id,
                company_id: data.company_id,
                title: data.title,
                description: data.description,
                price: data.price,
                address: data.address,
                city: data.city,
                state: data.state,
                country: data.country,
                zipcode: data.zipcode,
                latitude: data.latitude,
                longtitude: data.longtitude,
                property_type: data.property_type,
                bedrooms: data.bedrooms,
                bathrooms: data.bathrooms,
                area_size: data.area_size,
                year_built: data.year_built,
                floors: data.floors,
                parking_spaces: data.parking_spaces,
                is_active: data.is_active,
                } as Partial<PropertiesEntity>
            
                return await this.propertyRepository.update(id, property)
              }
            
              async softDelete(id: number) {
                const property = await this.propertyRepository.findById(id)
                if (!property) throw new NotFoundException('news not found')
                return this.propertyRepository.softDelete(id)
              }
}
