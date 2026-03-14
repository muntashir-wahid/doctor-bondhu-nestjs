import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repo/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  public async create(createUserDto: any) {
    const newUser = await this.userRepository.createOne(createUserDto);
    return {
      message: 'User created successfully',
      data: newUser,
    };
  }
}
