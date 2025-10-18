import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserStatus } from 'src/users/enums/user-status.enum';

export class CreateClinicDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(150)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(500)
  address: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(14)
  phoneNumber: string;

  @IsString()
  @IsOptional()
  @MinLength(10)
  @MaxLength(1500)
  description?: string;

  @IsEnum(UserStatus)
  status: UserStatus = UserStatus.PENDING;
}
