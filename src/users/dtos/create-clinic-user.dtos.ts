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
import { UserRole } from '../enums/user-role.enum';
import { UserClinicRole } from '../enums/user-clinic-role.enum';

export class CreateClinicUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(56)
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  @MaxLength(32)
  password?: string;

  @IsEnum(UserRole)
  role: UserRole = UserRole.USER;

  @IsInt()
  @IsNotEmpty()
  clinicId: number;

  @IsEnum(UserClinicRole)
  clinicRole: UserClinicRole = UserClinicRole.PATIENT;
}
