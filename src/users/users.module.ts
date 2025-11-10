import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './providers/users.service';
import { HashingProvider } from './providers/hashing.provider';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User]), UtilsModule],
  providers: [UsersService, HashingProvider],
  exports: [UsersService, HashingProvider],
})
export class UsersModule {}
