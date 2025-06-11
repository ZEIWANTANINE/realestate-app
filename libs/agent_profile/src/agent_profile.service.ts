import { AgentProfilesRepository, UserRepository, AgencyRepository } from '@app/database/repositories';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ICreateAgentProfiles, IListAgentProfile, IUpdateAgentProfile } from './agent_profile.interface';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@app/common';

@Injectable()
export class AgentProfileService {
    findById(id: number) {
        throw new Error('Method not implemented.');
    }
constructor(
    private readonly userRepository: UserRepository,
    private readonly agentProfilesRepository: AgentProfilesRepository,
    private readonly agencyRepository: AgencyRepository
) {} 

  async create(data: ICreateAgentProfiles) {
    const user = await this.userRepository.findById(data.user_id);
    const agency = await this.agencyRepository.findById(data.agency_id);
    if (!user||!agency) {
      throw new NotFoundException('Agent not found')
    }
    const buyer_profile = await this.agentProfilesRepository.create({
      user_id: data.user_id,
      agency_id: data.agency_id,
      name: data.name,
      phone: data.phone,
      avatar_url: data.avatar_url,
      license_number: data.license_number,
      rating: data.rating,
    })
    return buyer_profile
  }

  async findAll(params: IListAgentProfile) {
    return this.agentProfilesRepository.findAll({
      ...params,
      size: params.size || DEFAULT_PAGE_SIZE,
      page: params.page || DEFAULT_PAGE,
    })
  }

  async findOne(id: number) {
    const buyer_profile = await this.agentProfilesRepository.findById(id)
    if (!buyer_profile) throw new NotFoundException('Buyer_Profile not found')
    return buyer_profile
  }

  async update(id: number, data: IUpdateAgentProfile) {
    const user = await this.userRepository.findById(data.user_id);
    const agency = await this.agencyRepository.findById(data.agency_id);
    if (!user||!agency) {
      throw new NotFoundException('Agent not found')
    }
    await this.agentProfilesRepository.update(id, {
      user_id: data.user_id,
      agency_id: data.agency_id,
      name: data.name,
      phone: data.phone,
      avatar_url: data.avatar_url,
      license_number: data.license_number,
      rating: data.rating,
    })
    return this.findOne(id)
  }

  async softDelete(id: number) {
    const buyer_profile = await this.agentProfilesRepository.findById(id)
    if (!buyer_profile) throw new NotFoundException('Buyer_Profile not found')
    return this.agentProfilesRepository.softDelete(id)
  }
}
