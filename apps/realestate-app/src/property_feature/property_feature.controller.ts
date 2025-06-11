import { Body, Controller, Get, Param, Patch, Post, Delete, Query } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { PropertyFeaturesService } from '@app/property_features/property_features.service'
import { CreatePropertyFeatureDto, PropertyFeatureResponseDto, UpdatePropertyFeatureDto } from './property_feature.dto'

@Controller('property_feature')
export class PropertyFeatureController {
  constructor(private readonly propertyFeatureService: PropertyFeaturesService) {}

  @Post('create')
  async create(@Body() dto: CreatePropertyFeatureDto) {
    const result = await this.propertyFeatureService.create(dto)
    return plainToInstance(PropertyFeatureResponseDto, result, { excludeExtraneousValues: true })
  }

  @Get()
  async findAll(@Query() query) {
    const result = await this.propertyFeatureService.findAll(query)
    return result.data.map(item => plainToInstance(PropertyFeatureResponseDto, item, { excludeExtraneousValues: true }))
  }

  @Get('detail/:id')
  async findOne(@Param('id') id: number) {
    const result = await this.propertyFeatureService.findOne(id)
    return plainToInstance(PropertyFeatureResponseDto, result, { excludeExtraneousValues: true })
  }

  @Patch('update/:id')
  async update(@Param('id') id: number, @Body() dto: UpdatePropertyFeatureDto) {
    const result = await this.propertyFeatureService.update(id, dto)
    return plainToInstance(PropertyFeatureResponseDto, result, { excludeExtraneousValues: true })
  }

  @Delete('soft-delete/:id')
  async softDelete(@Param('id') id: number) {
    return this.propertyFeatureService.softDelete(id)
  }
}