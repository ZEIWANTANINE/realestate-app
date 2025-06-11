import { Body, Controller, Get, Param, Patch, Post, Delete, Query } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { PropertyMediaService } from '@app/property_media'
import { CreatePropertyMediaDto, PropertyMediaResponseDto, UpdatePropertyMediaDto } from './property_media.dto'

@Controller('property_media')
export class PropertyMediaController {
  constructor(private readonly propertyMediaService: PropertyMediaService) {}

  @Post('create')
  async create(@Body() dto: CreatePropertyMediaDto) {
    const result = await this.propertyMediaService.create(dto)
    return plainToInstance(PropertyMediaResponseDto, result, { excludeExtraneousValues: true })
  }

  @Get()
  async findAll(@Query() query) {
    const result = await this.propertyMediaService.findAll(query)
    return result.data.map(item => plainToInstance(PropertyMediaResponseDto, item, { excludeExtraneousValues: true }))
  }

  @Get('detail/:id')
  async findOne(@Param('id') id: number) {
    const result = await this.propertyMediaService.findOne(id)
    return plainToInstance(PropertyMediaResponseDto, result, { excludeExtraneousValues: true })
  }

  @Patch('update/:id')
  async update(@Param('id') id: number, @Body() dto: UpdatePropertyMediaDto) {
    const result = await this.propertyMediaService.update(id, dto)
    return plainToInstance(PropertyMediaResponseDto, result, { excludeExtraneousValues: true })
  }

  @Delete('soft-delete/:id')
  async softDelete(@Param('id') id: number) {
    return this.propertyMediaService.softDelete(id)
  }
}