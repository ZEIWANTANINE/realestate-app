import { Body, Controller, Get, Param, Patch, Post, Delete, Query } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { CreatePropertyDto, PropertyResponseDto, UpdatePropertyDto } from './property.dto'
import { PropertyService } from '@app/property'


@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post('create')
  async create(@Body() dto: CreatePropertyDto) {
    const result = await this.propertyService.create(dto)
    return plainToInstance(PropertyResponseDto, result, { excludeExtraneousValues: true })
  }

  @Get()
  async findAll(@Query() query) {
    const result = await this.propertyService.findAll(query)
    return {
      ...result,
      data: result.data.map(item => plainToInstance(PropertyResponseDto, item, { excludeExtraneousValues: true }))
    }
  }

  @Get('detail/:id')
  async findOne(@Param('id') id: number) {
    const result = this.propertyService.findOne(id)
    return plainToInstance(PropertyResponseDto, result, { excludeExtraneousValues: true })
  }

  @Patch('update/:id')
  async update(@Param('id') id: number, @Body() dto: UpdatePropertyDto) {
    const result = await this.propertyService.update(id, dto)
    return plainToInstance(PropertyResponseDto, result, { excludeExtraneousValues: true })
  }

  @Delete('soft-delete/:id')
  async softDelete(@Param('id') id: number) {
    return this.propertyService.softDelete(id)
  }
}