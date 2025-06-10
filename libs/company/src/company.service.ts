import { CompanyRepository } from '@app/database/repositories/company.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ICreateCompany, IListCompany, IUpdateCompany } from './company.interface';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@app/common';
import { CompanyEntity } from '@app/database';

@Injectable()
export class CompanyService {
    constructor(
        private readonly companyRepository: CompanyRepository
    ) {}
    
      async create(data: ICreateCompany) {
        const company = await this.companyRepository.create({
          name: data.name,
          industry: data.industry,
          address: data.address,
          website: data.website,
          email: data.email,
          description: data.description,
          logo_url: data.logo_url,
          phone: data.phone
        })
        return company
      }
    
      async findAll(params: IListCompany) {
        return this.companyRepository.findAll({
          ...params,
          size: params.size || DEFAULT_PAGE_SIZE,
          page: params.page || DEFAULT_PAGE,
        })
      }
    
      async findOne(id: number) {
        const company = await this.companyRepository.findById(id)
        if (!company) throw new NotFoundException('company not found')
        return company
      }
    
      async update(id: number, data: IUpdateCompany) {
        const company = {
          name: data.name,
          industry: data.industry,
          address: data.address,
          website: data.website,
          email: data.email,
          description: data.description,
          logo_url: data.logo_url,
          phone: data.phone
        } as Partial<CompanyEntity>
    
        return await this.companyRepository.update(id, company)
      }
    
      async softDelete(id: number) {
        const company = await this.companyRepository.findById(id)
        if (!company) throw new NotFoundException('company not found')
        return this.companyRepository.softDelete(id)
      }
}
