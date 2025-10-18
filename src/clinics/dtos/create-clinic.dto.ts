import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from 'src/users/enums/user-status.enum';

export class CreateClinicDto {
  @ApiProperty({
    description: 'Name of the clinic',
    example: 'City General Hospital',
    minLength: 5,
    maxLength: 150,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(150)
  name: string;

  @ApiProperty({
    description: 'Physical address of the clinic',
    example: '123 Main Street, Downtown, City 12345',
    minLength: 10,
    maxLength: 500,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(500)
  address: string;

  @ApiProperty({
    description: 'Email address of the clinic',
    example: 'contact@citygeneralhospital.com',
    format: 'email',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Phone number of the clinic',
    example: '+1234567890',
    minLength: 11,
    maxLength: 14,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(14)
  phoneNumber: string;

  @ApiProperty({
    description: 'Detailed description of the clinic and its services',
    example:
      'A full-service medical facility providing comprehensive healthcare services including emergency care, surgery, and specialized treatments.',
    minLength: 10,
    maxLength: 1500,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(10)
  @MaxLength(1500)
  description?: string;

  @ApiProperty({
    description: 'Current status of the clinic',
    enum: UserStatus,
    default: UserStatus.PENDING,
    example: UserStatus.PENDING,
  })
  @IsEnum(UserStatus)
  status: UserStatus = UserStatus.PENDING;
}
