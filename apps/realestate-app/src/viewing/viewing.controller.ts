import { Body, Controller, Get, Param, Patch, Post, Delete, Query } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { FavoutireResponseDto } from '../favourite/favourite.dto'
import { CreateViewingDto, UpdateViewingDto, ViewingResponseDto } from './viewing.dto'
import { ViewingService } from '@app/viewing'

@Controller('viewing')
export class ViewingController {
  constructor(private readonly viewingService: ViewingService) {}

  @Post('create')
  async create(@Body() dto: CreateViewingDto) {
    const result = await this.viewingService.create(dto)
    return plainToInstance(ViewingResponseDto, result, { excludeExtraneousValues: true })
  }

  @Get()
  async findAll(@Query() query) {
    const result = await this.viewingService.findAll(query)
    return result.data.map(item => plainToInstance(FavoutireResponseDto, item, { excludeExtraneousValues: true }))
  }

  @Get('detail/:id')
  async findOne(@Param('id') id: number) {
    const result = await this.viewingService.findOne(id)
    return plainToInstance(ViewingResponseDto, result, { excludeExtraneousValues: true })
  }

  @Patch('update/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateViewingDto) {
    const result = await this.viewingService.update(id, dto)
    return plainToInstance(ViewingResponseDto, result, { excludeExtraneousValues: true })
  }

  @Delete('soft-delete/:id')
  async softDelete(@Param('id') id: number) {
    return this.viewingService.softDelete(id)
  }
}