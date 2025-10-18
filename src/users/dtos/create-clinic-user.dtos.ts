import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enums/user-role.enum';
import { UserClinicRole } from '../enums/user-clinic-role.enum';

export class CreateClinicUserDto {
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
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(6)
  @MaxLength(32)
  password?: string;

  @ApiProperty({
    description: 'Role of the user in the system',
    enum: UserRole,
    default: UserRole.USER,
    example: UserRole.USER,
  })
  @IsEnum(UserRole)
  role: UserRole = UserRole.USER;

  @ApiProperty({
    description: 'ID of the clinic the user belongs to',
    example: 1,
    type: 'integer',
  })
  @IsInt()
  @IsNotEmpty()
  clinicId: number;

  @ApiProperty({
    description: 'Role of the user within the clinic',
    enum: UserClinicRole,
    default: UserClinicRole.PATIENT,
    example: UserClinicRole.PATIENT,
  })
  @IsEnum(UserClinicRole)
  clinicRole: UserClinicRole = UserClinicRole.PATIENT;
}
