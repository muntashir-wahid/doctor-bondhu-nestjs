import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateClinicDto } from './dtos/create-clinic.dto';
import { ClinicsService } from './providers/clinics.service';
import {
  HasPermission,
  Role,
} from '../common/decorators/has-permission.decorator';

@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}
  @HasPermission(Role.SUPER_ADMIN)
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
