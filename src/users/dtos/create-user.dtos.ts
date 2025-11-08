import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDepartment } from '../enums/user-department.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
    minLength: 2,
    maxLength: 56,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(56)
  fullName: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
    format: 'email',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'password123',
    minLength: 6,
    maxLength: 32,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  password: string;

  @ApiProperty({
    description: 'Department of the user in the system',
    enum: UserDepartment,
    default: UserDepartment.CLINIC,
    example: UserDepartment.CLINIC,
  })
  @IsEnum(UserDepartment)
  department?: UserDepartment = UserDepartment.CLINIC;
}
