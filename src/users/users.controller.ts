import { Body, Controller, Post } from '@nestjs/common';
import { CreateClinicUserDto } from './dtos/create-clinic-user.dtos';
import { UsersService } from './providers/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createClinicUser(@Body() createClinicUserDto: CreateClinicUserDto) {
    return this.usersService.createClinicUser(createClinicUserDto);
  }
}
