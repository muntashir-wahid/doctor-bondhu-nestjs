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
import { Status } from 'src/users/enums/user.enum';

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
    description: 'Email address of the clinic',
    example: 'contact@citygeneralhospital.com',
    format: 'email',
    required: false,
  })
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
    enum: Status,
    default: Status.PENDING,
    example: Status.PENDING,
  })
  @IsEnum(Status)
  status: Status = Status.PENDING;
}
