import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaExceptionsService } from 'src/prisma/providers/prisma-exceptions.service';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaExceptionsService: PrismaExceptionsService,
  ) {}

  public async createOne(data: CreateUserDto) {
    try {
      const newUser = await this.prisma.user.create({
        data,
      });

      return newUser;
    } catch (error) {
      this.prismaExceptionsService.handlePrismaError(
        error,
        'Failed to create user',
      );
    }
  }

  public async findAll() {
    try {
      const users = await this.prisma.user.findMany({
        select: {
          uid: true,
          firstName: true,
          lastName: true,
          email: true,
          createdAt: true,
        },
      });
      return users;
    } catch (error) {
      this.prismaExceptionsService.handlePrismaError(
        error,
        'Failed to fetch users',
      );
    }
  }

  public async findById(uid: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { uid },
      });

      return user;
    } catch (error) {
      this.prismaExceptionsService.handlePrismaError(
        error,
        'Failed to fetch user',
      );
    }
  }

  public async findByEmail(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      return user;
    } catch (error) {
      this.prismaExceptionsService.handlePrismaError(
        error,
        'Failed to fetch user by email',
      );
    }
  }
}
