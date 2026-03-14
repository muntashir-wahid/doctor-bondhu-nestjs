import { Module } from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { UserRepository } from './repo/user.repository';
import { UsersController } from './users.controller';
import { HashingModule } from 'src/common/providers/hashing.module';

@Module({
  imports: [HashingModule],
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
