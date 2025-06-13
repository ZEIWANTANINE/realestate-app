import { Controller, Get, Post, Body, Param, Query, Put, Delete } from '@nestjs/common';
import { ConversationParticipantService } from '../../../../libs/conversation_participant/src/conversation_participant.service';
import { CreateParticipantDto, UpdateParticipantDto, ParticipantQueryDto } from './conversation_participant.dto';

@Controller('conversation-participants')
export class ConversationParticipantController {
  constructor(private readonly participantService: ConversationParticipantService) {}

  @Post()
  async create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create({
      ...createParticipantDto,
      joined_at: new Date(),
    });
  }

  @Get()
  async findAll(@Query() query: ParticipantQueryDto) {
    return this.participantService.findAll({
      page: query.page || 1,
      size: query.size || 20,
      user_id: query.user_id,
      conversation_id: query.conversation_id,
      role: query.role,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.participantService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(id, updateParticipantDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.participantService.softDelete(id);
  }
}
