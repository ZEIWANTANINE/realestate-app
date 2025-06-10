import { Body, Controller, Get, Param, Patch, Post, Delete, Query } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { NewsService } from '@app/news'
import { CreateNewDto, NewResponseDto, UpdateNewDto } from './new.dto'

@Controller('new')
export class NewController {
  constructor(private readonly newService: NewsService) {}

  @Post('create')
  async create(@Body() dto: CreateNewDto) {
    const result = await this.newService.create(dto)
    return plainToInstance(NewResponseDto, result, { excludeExtraneousValues: true })
  }

  @Get()
  async findAll(@Query() query) {
    const result = await this.newService.findAll(query)
    return {
      ...result,
      data: result.data.map(item => plainToInstance(NewResponseDto, item, { excludeExtraneousValues: true }))
    }
  }

  @Get('detail/:id')
  async findOne(@Param('id') id: number) {
    const result = this.newService.findOne(id)
    return plainToInstance(NewResponseDto, result, { excludeExtraneousValues: true })
  }

  @Patch('update/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateNewDto) {
    const result = await this.newService.update(id, dto)
    return plainToInstance(NewResponseDto, result, { excludeExtraneousValues: true })
  }

  @Delete('soft-delete/:id')
  async softDelete(@Param('id') id: number) {
    return this.newService.softDelete(id)
  }
}