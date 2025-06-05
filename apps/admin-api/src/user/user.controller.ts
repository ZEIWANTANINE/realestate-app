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
    CreateUserDto,
    ListUserRequestDto,
    UpdateUserDto,
    UserResponseDto,
  } from './user.dto'
  import { UserService } from '@app/user'
  import { plainToInstance } from 'class-transformer'
  
  @Controller('users')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Post('create')
    async create(@Body() dto: CreateUserDto) {
      return this.userService.create(dto)
    }
  
    @Get()
    // @Auth()
    async findAll(@Query() request: ListUserRequestDto) {
      const users = await this.userService.findAll(request)
      return {
        data: users.data.length
          ? users.data.map((item) =>
              plainToInstance(UserResponseDto, item, {
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
      const result = await this.userService.findOne(id)
      return plainToInstance(UserResponseDto, result, {
        ignoreDecorators: true,
        excludeExtraneousValues: true,
      })
    }
  
    @Patch('update/:id')
    async update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
      const result = await this.userService.update(id, dto)
      return plainToInstance(UserResponseDto, result, {
        ignoreDecorators: true,
        excludeExtraneousValues: true,
      })
    }
  
    @Delete('soft-delete/:id')
    async softDelete(@Param('id') id: number) {
      return this.userService.softDelete(id)
    }
  }
  