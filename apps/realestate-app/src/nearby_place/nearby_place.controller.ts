import { Body, Controller, Get, Param, Patch, Post, Delete, Query } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { NearbyPlaceService } from '@app/nearby_place'
import { CreateNearbyPlaceDto, NearbyPlaceResponseDto, UpdateNearbyPlaceDto } from './nearby_place.dto'

@Controller('nearby_place')
export class NearbyPlaceController {
  constructor(private readonly nearbyPlaceService: NearbyPlaceService) {}

  @Post('create')
  async create(@Body() dto: CreateNearbyPlaceDto) {
    const result = await this.nearbyPlaceService.create(dto)
    return plainToInstance(NearbyPlaceResponseDto, result, { excludeExtraneousValues: true })
  }

  @Get()
  async findAll(@Query() query) {
    const result = await this.nearbyPlaceService.findAll(query)
    return result.data.map(item => plainToInstance(NearbyPlaceResponseDto, item, { excludeExtraneousValues: true }))
  }

  @Get('detail/:id')
  async findOne(@Param('id') id: number) {
    const result = await this.nearbyPlaceService.findOne(id)
    return plainToInstance(NearbyPlaceResponseDto, result, { excludeExtraneousValues: true })
  }

  @Patch('update/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateNearbyPlaceDto) {
    const result = await this.nearbyPlaceService.update(id, dto)
    return plainToInstance(NearbyPlaceResponseDto, result, { excludeExtraneousValues: true })
  }

  @Delete('soft-delete/:id')
  async softDelete(@Param('id') id: number) {
    return this.nearbyPlaceService.softDelete(id)
  }
}