import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dtos';
import { UsersService } from './providers/users.service';
import { CreateSuperUserDto } from './dtos/create-super-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/super-user')
  createSuperUser(@Body() createSuperUserDto: CreateSuperUserDto) {
    return this.usersService.createSuperUser(createSuperUserDto);
  }

  // @Post('/clinic-user')
  // createClinicUser(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.createClinicUser(createUserDto);
  // }
}
