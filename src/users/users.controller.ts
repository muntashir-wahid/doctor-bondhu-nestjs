import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  ParseUUIDPipe,
  Param,
} from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import {
  HasPermission,
  Role,
} from '../common/decorators/has-permission.decorator';

@Controller('users')
@HasPermission(Role.SUPER_ADMIN)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':uid')
  getUserById(@Param('uid', new ParseUUIDPipe()) uid: string) {
    return this.usersService.findById(uid);
  }
}
