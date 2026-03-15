import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateClinicDto } from './dtos/create-clinic.dto';
import { ClinicsService } from './providers/clinics.service';

@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}
  @Post()
  createClinic(@Body() createClinicDto: CreateClinicDto) {
    return this.clinicsService.create(createClinicDto);
  }

  @Get()
  getClinics() {
    return {
      message: 'List of clinics',
    };
  }
}
