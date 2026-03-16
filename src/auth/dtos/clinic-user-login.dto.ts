import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsUUID,
  MinLength,
} from 'class-validator';
import { Roles } from '../../generated/prisma/enums';

export class ClinicUserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsNotEmpty()
  @IsUUID(4, { message: 'clinicUid must be a valid UUID v4' })
  clinicUid: string;

  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;
}
