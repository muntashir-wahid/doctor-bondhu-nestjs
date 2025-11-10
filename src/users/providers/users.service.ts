import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { HashingProvider } from './hashing.provider';
import { CreateSuperUserDto } from '../dtos/create-super-user.dto';
import { UserDepartment } from '../enums/user-department.enum';
import { CatchAndThrowAsyncErrors } from 'src/utils/providers/catch-and-throw-async-errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
    private hashingProvider: HashingProvider,
    private readonly catchAndThrowAsyncError: CatchAndThrowAsyncErrors,
  ) {}

  public async createSuperUser(createSuperUserDto: CreateSuperUserDto) {
    try {
      // const password = Math.random().toString(36).slice(-8);
      const password = '123456789';
      const hashedPassword = await this.hashingProvider.hashPassword(password);

      const payload = {
        fullName: createSuperUserDto.fullName,
        email: createSuperUserDto.email,
        department: UserDepartment.SUPER_USER,
        password: hashedPassword,
      };

      const newUser = this.user.create(payload);
      return await this.user.save(newUser);
    } catch (error) {
      this.catchAndThrowAsyncError.execute(error);
    }
  }

  public async findByEmail(email: string) {
    return this.user.findOne({
      where: { email },
      select: [
        'id',
        'fullName',
        'email',
        'password',
        'department',
        'createdAt',
      ],
    });
  }
}
