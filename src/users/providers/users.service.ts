import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dtos';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    const isExisting = await this.user.findOneBy({
      email: createUserDto.email,
    });

    if (isExisting) {
      throw new BadRequestException('User already exists');
    }

    const newUser = this.user.create(createUserDto);
    return this.user.save(newUser);
  }
}
