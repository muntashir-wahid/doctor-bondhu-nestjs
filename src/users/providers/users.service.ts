import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repo/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { HashingProvider } from '../../common/providers/hashing/hashing.provider';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hashingProvider.hash(
      createUserDto.password,
    );

    const newUser = await this.userRepository.createOne({
      ...createUserDto,
      password: hashedPassword,
    });

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
    if (!user) {
      return {
        message: 'User not found',
        data: null,
      };
    }

    return {
      message: 'User fetched successfully',
      data: new UserResponseDto(user),
    };
  }

  public async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }
}
