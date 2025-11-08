import { Body, Controller, Post } from '@nestjs/common';
import { ClinicServicesService } from './providers/clinic-services.service';
import { CreateClinicServiceDto } from './dtos/create-clinic-service.dto';

@Controller('clinic-services')
export class ClinicServicesController {
  constructor(private readonly clinicServicesService: ClinicServicesService) {}

  @Post()
  create(@Body() createClinicServiceDto: CreateClinicServiceDto) {
    return this.clinicServicesService.createOne(createClinicServiceDto);
  }
}
