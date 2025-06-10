import { AgencyEntity, AgencyRepository } from '@app/database';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ICreateAgency, IListAgency, IUpdateAgency } from './agency.interface';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE } from '@app/common';

@Injectable()
export class AgencyService {
    findById(id: number) {
        throw new Error('Method not implemented.');
    }
    constructor(
        private readonly agencyRepository: AgencyRepository
    ) {}

      async create(data: ICreateAgency) {
        const agency = await this.agencyRepository.create({
          name: data.name,
          phone: data.phone,
          logo_url: data.logo_url,
          address: data.address,
          website: data.website
        })
        return agency
      }
    
      async findAll(params: IListAgency) {
        return this.agencyRepository.findAll({
          ...params,
          size: params.size || DEFAULT_PAGE_SIZE,
          page: params.page || DEFAULT_PAGE,
        })
      }
    
      async findOne(id: number) {
        const agency = await this.agencyRepository.findById(id)
        if (!agency) throw new NotFoundException('agency not found')
        return agency
      }
    
      async update(id: number, data: IUpdateAgency) {
        const agency = {
          name: data.name,
          phone: data.phone,
          logo_url: data.logo_url,
          address: data.address,
          website: data.website
        } as Partial<AgencyEntity>
    
        return await this.agencyRepository.update(id, agency)
      }
    
      async softDelete(id: number) {
        const agency = await this.agencyRepository.findById(id)
        if (!agency) throw new NotFoundException('agency not found')
        return this.agencyRepository.softDelete(id)
      }
}
