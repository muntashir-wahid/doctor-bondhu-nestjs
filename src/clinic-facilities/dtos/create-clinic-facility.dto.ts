import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from 'src/users/enums/user.enum';

export class CreateClinicFacilityDto {
  @ApiProperty({
    description: 'Name of the clinic facility',
    example: 'Emergency Room',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Current status of the clinic facility',
    enum: Status,
    default: Status.PENDING,
    example: Status.PENDING,
  })
  @IsEnum(Status)
  status: Status = Status.PENDING;
}
