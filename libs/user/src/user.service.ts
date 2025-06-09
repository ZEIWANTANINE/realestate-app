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
    const user = await this.userRepository.create({
      email: data.email,
      // Use the correct property name as defined in UserEntity, e.g., hashedPassword
      password: userPassword,
      role: data.role || USER_ROLE.USER,
    })
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
    const user = await this.userRepository.findById(id)
    if (!user) throw new NotFoundException('User not found')
    return user
  }

  async update(id: number, data: IUpdateUser) {
    const user = await this.userRepository.findById(id)
    if (!user) throw new NotFoundException('User not found')
    const userUpdate: Partial<UserEntity> = {}
    if (data.email) userUpdate.email = data.email
    if (data.password) {
      const salt = await bcrypt.genSalt(10)
      userUpdate.password = await bcrypt.hash(data.password, salt)
    }
    if (data.role) userUpdate.role = data.role
    await this.userRepository.update(id, userUpdate)
    return await this.userRepository.findById(id)
  }

  async softDelete(id: number) {
    const user = await this.userRepository.findById(id)
    if (!user) throw new NotFoundException('User not found')
    return this.userRepository.softDelete(id)
  }
}