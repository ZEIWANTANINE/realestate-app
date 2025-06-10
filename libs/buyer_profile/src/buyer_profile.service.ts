import { BuyerProfilesRepository } from '@app/database/repositories/buyer_profiles.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ICreateBuyerProfile, IListBuyerProfile, IUpdateBuyerProfile } from './buyer_profile.interface';
import { USER_ROLE } from '@app/auth';
import { DEFAULT_PASSWORD, DEFAULT_PAGE_SIZE, DEFAULT_PAGE } from '@app/common';
import { BuyerProfilesEntity, UserRepository } from '@app/database';
import { IUpdateUser } from '@app/user/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BuyerProfileService {
constructor(
    private readonly userRepository: UserRepository,
    private readonly buyerProfilesRepository: BuyerProfilesRepository
) {}

  async create(data: ICreateBuyerProfile) {
    const user = await this.userRepository.findById(data.user_id);
    if (!user) {
      throw new NotFoundException('Author not found')
    }
    const buyer_profile = await this.buyerProfilesRepository.create({
    user_id: data.user_id,
      name: data.name,
      phone: data.phone,
      avatar_url: data.avatar_url,
      prefered_location: data.prefered_location,
      budget: data.budget
    })
    return buyer_profile
  }

  async findAll(params: IListBuyerProfile) {
    return this.buyerProfilesRepository.findAll({
      ...params,
      size: params.size || DEFAULT_PAGE_SIZE,
      page: params.page || DEFAULT_PAGE,
    })
  }

  async findOne(id: number) {
    const buyer_profile = await this.buyerProfilesRepository.findById(id)
    if (!buyer_profile) throw new NotFoundException('Buyer_Profile not found')
    return buyer_profile
  }

  async update(id: number, data: IUpdateBuyerProfile) {
    const user = this.userRepository.findById(data.user_id)
    if (!user) throw new NotFoundException('User not found')
    const userUpdate = {
      user_id: data.user_id,
      name: data.name,
      phone: data.phone,
      avatar_url: data.avatar_url,
      prefered_location: data.prefered_location,
      budget: data.budget
    } as Partial<BuyerProfilesEntity>

    return await this.userRepository.update(id, userUpdate)
  }

  async softDelete(id: number) {
    const buyer_profile = await this.buyerProfilesRepository.findById(id)
    if (!buyer_profile) throw new NotFoundException('Buyer_Profile not found')
    return this.buyerProfilesRepository.softDelete(id)
  }
}
