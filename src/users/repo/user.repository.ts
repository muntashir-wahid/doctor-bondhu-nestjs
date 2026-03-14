import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaExceptionsService } from 'src/prisma/providers/prisma-exceptions.service';

@Injectable()
export class UserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaExceptionsService: PrismaExceptionsService,
  ) {}

  public async createOne(data: any) {
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

  public async findById() {
    return this.prisma.user.findMany({});
  }
}
