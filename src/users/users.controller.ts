import { Body, Controller, Post } from '@nestjs/common';
import { CreateClinicUserDto } from './dtos/create-clinic-user.dtos';

@Controller('users')
export class UsersController {
  @Post()
  createClinicUser(@Body() createUserDto: CreateClinicUserDto) {
    console.log('Creating clinic user:', createUserDto);
    return {
      message: 'Clinic user created successfully',
      user: createUserDto,
    };
  }
}
