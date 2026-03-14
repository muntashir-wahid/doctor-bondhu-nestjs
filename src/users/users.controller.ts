import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './providers/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: any) {
    return this.usersService.create(createUserDto);
  }
}
