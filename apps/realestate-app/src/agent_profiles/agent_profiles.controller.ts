import { Body, Controller, Get, Param, Patch, Post, Delete, Query } from '@nestjs/common'
// Update the import path below to the correct location of AgentProfilesService
import { AgentProfileService } from '../../../../libs/agent_profile/src/agent_profile.service'
// Update the import paths below to the correct locations of DTOs
import { CreateAgentProfilesDto, UpdateAgentProfilesDto, AgentProfilesResponseDto } from './agent_profiles.dto'
import { plainToInstance } from 'class-transformer'

@Controller('agent_profiles')
export class AgentProfileController {
  constructor(private readonly agentProfilesService: AgentProfileService) {}

  @Post('create')
  async create(@Body() dto: CreateAgentProfilesDto) {
    const result = await this.agentProfilesService.create(dto)
    return plainToInstance(AgentProfilesResponseDto, result, { excludeExtraneousValues: true })
  }

  @Get()
  async findAll(@Query() query) {
    const result = await this.agentProfilesService.findAll(query)
    return result.data.map(item => plainToInstance(AgentProfilesResponseDto, item, { excludeExtraneousValues: true }))
  }

  @Get('detail/:id')
  async findOne(@Param('id') id: number) {
    const result = await this.agentProfilesService.findById(id)
    return plainToInstance(AgentProfilesResponseDto, result, { excludeExtraneousValues: true })
  }

  @Patch('update/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateAgentProfilesDto) {
    const result = await this.agentProfilesService.update(id, dto)
    return plainToInstance(AgentProfilesResponseDto, result, { excludeExtraneousValues: true })
  }

  @Delete('soft-delete/:id')
  async softDelete(@Param('id') id: number) {
    return this.agentProfilesService.softDelete(id)
  }
}