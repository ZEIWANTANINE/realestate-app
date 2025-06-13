import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { MessageReadService } from '../../../../libs/message_read/src/message_read.service';
import { MarkMessageReadDto, MessageReadQueryDto } from './message_read.dto';

@Controller('message-reads')
export class MessageReadController {
  constructor(private readonly messageReadService: MessageReadService) {}

  @Post()
  async markAsRead(@Body() markMessageReadDto: MarkMessageReadDto) {
    return this.messageReadService.markMessageAsRead(
      markMessageReadDto.message_id,
      1, // TODO: Get from auth context
    );
  }

  @Get()
  async findAll(@Query() query: MessageReadQueryDto) {
    return this.messageReadService.findAll({
      page: query.page || 1,
      size: query.size || 20,
      user_id: query.user_id,
      message_id: query.message_id,
      conversation_id: query.conversation_id,
    });
  }

  @Get('unread')
  async getUnreadMessages(
    @Query('conversation_id') conversationId: number,
    @Query('user_id') userId: number,
  ) {
    return this.messageReadService.getUnreadMessages(userId, conversationId);
  }
}
