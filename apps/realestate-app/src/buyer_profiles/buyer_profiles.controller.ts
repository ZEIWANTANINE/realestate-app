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
  CreateBuyerProfilesDto,
  ListBuyerProfilesRequestDto,
  UpdateBuyerProfilesDto,
  BuyerProfilesResponseDto,
} from './buyer_profiles.dto'
import { BuyerProfileService } from '@app/buyer_profile'
import { plainToInstance } from 'class-transformer'

@Controller('buyer_profiles')
export class BuyerProfileController {
  constructor(private readonly buyerService: BuyerProfileService) {}

  @Post('create')
  async create(@Body() dto: CreateBuyerProfilesDto) {
    const user = await this.buyerService.create(dto)
    return plainToInstance(BuyerProfilesResponseDto, user, {
      ignoreDecorators: true,
      excludeExtraneousValues: true,
    })
  }

  @Get()
  async findAll(@Query() request: ListBuyerProfilesRequestDto) {
    const users = await this.buyerService.findAll(request)
    return {
      data: users.data.length
        ? users.data.map((item) =>
            plainToInstance(BuyerProfilesResponseDto, item, {
              ignoreDecorators: true,
              excludeExtraneousValues: true,
            }),
          )
        : [],
      pagination: users.pagination,
    }
  }

  @Get('detail/:id')
  async findOne(@Param('id') id: number) {
    const result = await this.buyerService.findOne(id)
    return plainToInstance(BuyerProfilesResponseDto, result, {
      ignoreDecorators: true,
      excludeExtraneousValues: true,
    })
  }

  @Patch('update/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateBuyerProfilesDto) {
    const result = await this.buyerService.update(id, dto)
    return plainToInstance(BuyerProfilesResponseDto, result, {
      ignoreDecorators: true,
      excludeExtraneousValues: true,
    })
  }

  @Delete('soft-delete/:id')
  async softDelete(@Param('id') id: number) {
    return this.buyerService.softDelete(id)
  }
}