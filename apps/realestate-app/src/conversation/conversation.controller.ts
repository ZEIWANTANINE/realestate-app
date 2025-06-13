import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ConversationService } from '../../../../libs/conversation/src/conversation.service';
import { CreateConversationDto, AddParticipantDto, ConversationQueryDto } from './conversation.dto';

@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  async create(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationService.create(createConversationDto);
  }

  @Get()
  async findAll(@Query() query: ConversationQueryDto) {
    return this.conversationService.findAll({
      page: query.page || 1,
      size: query.size || 20,
      type: query.type,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.conversationService.findById(id);
  }

  @Post(':id/participants')
  async addParticipant(
    @Param('id') id: number,
    @Body() addParticipantDto: AddParticipantDto,
  ) {
    return this.conversationService.addParticipant({
      conversation_id: id,
      ...addParticipantDto,
    });
  }

  @Get(':id/participants')
  async getParticipants(@Param('id') id: number) {
    return this.conversationService.getConversationParticipants(id);
  }
}
