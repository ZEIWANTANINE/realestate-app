import { Body, Controller, Get, Param, Patch, Post, Delete, Query } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { FavouriteService } from '@app/favourite'
import { CreateFavouriteDto, FavoutireResponseDto, UpdateFavouriteDto } from './favourite.dto'

@Controller('favourite')
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {}

  @Post('create')
  async create(@Body() dto: CreateFavouriteDto) {
    const result = await this.favouriteService.create(dto)
    return plainToInstance(FavoutireResponseDto, result, { excludeExtraneousValues: true })
  }

  @Get()
  async findAll(@Query() query) {
    const result = await this.favouriteService.findAll(query)
    return result.data.map(item => plainToInstance(FavoutireResponseDto, item, { excludeExtraneousValues: true }))
  }

  @Get('detail/:id')
  async findOne(@Param('id') id: number) {
    const result = await this.favouriteService.findOne(id)
    return plainToInstance(FavoutireResponseDto, result, { excludeExtraneousValues: true })
  }

  @Patch('update/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateFavouriteDto) {
    const result = await this.favouriteService.update(id, dto)
    return plainToInstance(FavoutireResponseDto, result, { excludeExtraneousValues: true })
  }

  @Delete('soft-delete/:id')
  async softDelete(@Param('id') id: number) {
    return this.favouriteService.softDelete(id)
  }
}