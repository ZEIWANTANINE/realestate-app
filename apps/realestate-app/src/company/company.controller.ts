import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common'

import {
  CreateCompanyDto,
  ListCompanyRequestDto,
  UpdateCompanyDto,
  CompanyResponseDto,
} from './company.dto'
import { plainToInstance } from 'class-transformer'
import { CompanyService } from '@app/company/company.service'

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('create')
  async create(@Body() dto: CreateCompanyDto) {
    const user = await this.companyService.create(dto)
    return plainToInstance(CompanyResponseDto, user, {
      ignoreDecorators: true,
      excludeExtraneousValues: true,
    })
  }

  @Get()
    async findAll(@Query() query) {
      const result = await this.companyService.findAll(query)
      return result.map(item => plainToInstance(CompanyResponseDto, item, { excludeExtraneousValues: true }))
    }

  @Get('detail/:id')
  async findOne(@Param('id') id: number) {
    const result = await this.companyService.findOne(id)
    return plainToInstance(CompanyResponseDto, result, {
      ignoreDecorators: true,
      excludeExtraneousValues: true,
    })
  }

  @Patch('update/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateCompanyDto) {
    const result = await this.companyService.update(id, dto)
    return plainToInstance(CompanyResponseDto, result, {
      ignoreDecorators: true,
      excludeExtraneousValues: true,
    })
  }

  @Delete('soft-delete/:id')
  async softDelete(@Param('id') id: number) {
    return this.companyService.softDelete(id)
  }
}