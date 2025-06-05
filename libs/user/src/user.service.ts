import { UserEntity } from '@app/database';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@app/common';
import { USER_ROLE } from '@app/auth';
import { DEFAULT_PASSWORD } from '@app/common';
import { UserRepository } from '@app/database';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IListUser, IUpdateUser } from './user.interface';
import { ICreateUser } from './user.interface';
@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

  async create(data: ICreateUser) {
    const salt = await bcrypt.genSalt(10)
    const userPassword = await bcrypt.hash(
      data.password || DEFAULT_PASSWORD,
      salt,
    )
    const user = this.userRepository.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      password: userPassword,
      organization_id: data.organization_id,
      role: data.role || USER_ROLE.USER,
      code: data.code,
      level: data.level,
      hour_target: data.hour_target,
    }) as Partial<UserEntity>
    return user
  }

  async findAll(params: IListUser) {
    return this.userRepository.findAll({
      ...params,
      size: params.size || DEFAULT_PAGE_SIZE,
      page: params.page || DEFAULT_PAGE,
    })
  }

  async findOne(id: number) {
    const user = this.userRepository.findById(id)
    if (!user) throw new NotFoundException('User not found')
    return user
  }

  async update(id: number, data: IUpdateUser) {
    const user = this.userRepository.findById(id)
    if (!user) throw new NotFoundException('User not found')
    const userUpdate = {
      name: data.name,
      phone: data.phone,
      gender: data.gender,
      organization_id: data.organization_id,
      role_id: data.role,
      code: data.code,
      level: data.level,
      hour_target: data.hour_target,
    } as Partial<UserEntity>

    return await this.userRepository.update(id, userUpdate)
  }

  async softDelete(id: number) {
    const user = this.userRepository.findById(id)
    if (!user) throw new NotFoundException('User not found')
    return this.userRepository.softDelete(id)
  }
}
