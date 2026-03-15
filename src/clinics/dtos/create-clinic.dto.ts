import {
  IsArray,
  IsDefined,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateClinicServiceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateClinicOwnerDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}

export class CreateClinicFacilityDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateClinicWorkingHourDto {
  @IsInt()
  @Min(0)
  @Max(6)
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday

  @IsNotEmpty()
  @IsString()
  openTime: string; // e.g., "09:00"

  @IsNotEmpty()
  @IsString()
  closeTime: string; // e.g., "17:00"
}

export class CreateClinicDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  contact?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsUrl()
  clinicBanner?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateClinicServiceDto)
  services?: CreateClinicServiceDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateClinicFacilityDto)
  facilities?: CreateClinicFacilityDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateClinicWorkingHourDto)
  workingHours?: CreateClinicWorkingHourDto[];

  @IsDefined()
  @ValidateNested()
  @Type(() => CreateClinicOwnerDto)
  owner: CreateClinicOwnerDto;
}
