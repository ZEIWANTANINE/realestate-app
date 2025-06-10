import { Body, Controller, Get, Param, Patch, Post, Delete, Query } from '@nestjs/common'
import { CreateAgencyDto, UpdateAgencyDto, AgencyResponseDto } from './agency.dto'
import { plainToInstance } from 'class-transformer'
import { AgencyService } from '@app/agency/agency.service'

@Controller('agency')
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  @Post('create')
  async create(@Body() dto: CreateAgencyDto) {
    const result = await this.agencyService.create(dto)
    return plainToInstance(AgencyResponseDto, result, { excludeExtraneousValues: true })
  }

  @Get()
  async findAll(@Query() query) {
    const result = await this.agencyService.findAll(query)
    return result.map(item => plainToInstance(AgencyResponseDto, item, { excludeExtraneousValues: true }))
  }

  @Get('detail/:id')
  async findOne(@Param('id') id: number) {
    const result = this.agencyService.findById(id)
    return plainToInstance(AgencyResponseDto, result, { excludeExtraneousValues: true })
  }

  @Patch('update/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateAgencyDto) {
    const result = await this.agencyService.update(id, dto)
    return plainToInstance(AgencyResponseDto, result, { excludeExtraneousValues: true })
  }

  @Delete('soft-delete/:id')
  async softDelete(@Param('id') id: number) {
    return this.agencyService.softDelete(id)
  }
}