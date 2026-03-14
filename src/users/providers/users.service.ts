import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repo/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  public async create(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.createOne(createUserDto);
    return {
      message: 'User created successfully',
      data: new UserResponseDto(newUser),
    };
  }

  public async findAll() {
    const users = await this.userRepository.findAll();
    return {
      message: 'Users fetched successfully',
      data: users,
    };
  }

  public async findById(uid: string) {
    const user = await this.userRepository.findById(uid);

    return {
      message: 'User fetched successfully',
      data: user ? new UserResponseDto(user) : null,
    };
  }
}
