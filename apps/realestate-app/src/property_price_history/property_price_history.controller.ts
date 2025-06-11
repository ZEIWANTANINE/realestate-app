import { Body, Controller, Get, Param, Patch, Post, Delete, Query } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { CreatePropertyPriceHistoryDto, PropertyPriceHistoryResponseDto, UpdatePropertyPriceHistoryDto } from './property_price_history.dto'
import { PropertyPriceHistoryService } from '@app/property_price_history'

@Controller('property_price_history')
export class PropertyPriceHistoryController {
  constructor(private readonly propertyPriceHistoryService: PropertyPriceHistoryService) {}

  @Post('create')
  async create(@Body() dto: CreatePropertyPriceHistoryDto) {
    const result = await this.propertyPriceHistoryService.create(dto)
    return plainToInstance(PropertyPriceHistoryResponseDto, result, { excludeExtraneousValues: true })
  }

  @Get()
  async findAll(@Query() query) {
    const result = await this.propertyPriceHistoryService.findAll(query)
    return result.data.map(item => plainToInstance(PropertyPriceHistoryResponseDto, item, { excludeExtraneousValues: true }))
  }

  @Get('detail/:id')
  async findOne(@Param('id') id: number) {
    const result = await this.propertyPriceHistoryService.findOne(id)
    return plainToInstance(PropertyPriceHistoryResponseDto, result, { excludeExtraneousValues: true })
  }

  @Patch('update/:id')
  async update(@Param('id') id: number, @Body() dto: UpdatePropertyPriceHistoryDto) {
    const result = await this.propertyPriceHistoryService.update(id, dto)
    return plainToInstance(PropertyPriceHistoryResponseDto, result, { excludeExtraneousValues: true })
  }

  @Delete('soft-delete/:id')
  async softDelete(@Param('id') id: number) {
    return this.propertyPriceHistoryService.softDelete(id)
  }
}