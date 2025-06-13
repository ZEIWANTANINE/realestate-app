import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { MessageService } from '../../../../libs/message/src/message.service';
import { CreateMessageDto, MessageQueryDto } from './message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create({
      ...createMessageDto,
      sender_id: 1, // TODO: Get from auth context
    });
  }

  @Get()
  async findAll(@Query() query: MessageQueryDto) {
    return this.messageService.findAll({
      page: query.page || 1,
      size: query.size || 20,
      conversation_id: query.conversation_id,
      sender_id: query.sender_id,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.messageService.findById(id);
  }
}
