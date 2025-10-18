import { Body, Controller, Post } from '@nestjs/common';
import { CreateClinicDto } from './dtos/create-clinic.dto';

@Controller('clinics')
export class ClinicsController {
  @Post()
  createClinic(@Body() createClinicDto: CreateClinicDto) {
    console.log('Creating a new clinic', createClinicDto);
    return {
      message: 'Clinic created successfully',
      clinic: createClinicDto,
    };
  }
}
