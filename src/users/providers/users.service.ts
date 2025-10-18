import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateClinicUserDto } from '../dtos/create-clinic-user.dtos';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
  ) {}

  public async createClinicUser(createClinicUserDto: CreateClinicUserDto) {
    const newUser = this.user.create(createClinicUserDto);
    return this.user.save(newUser);
  }
}
