import { Module } from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { UserRepository } from './repo/user.repository';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
})
export class UsersModule {}
