import { Body, Controller, Post } from '@nestjs/common';
import { ClinicFacilitiesService } from './providers/clinic-facilities.service';
import { CreateClinicFacilityDto } from './dtos/create-clinic-facility.dto';

@Controller('clinic-facilities')
export class ClinicFacilitiesController {
  constructor(
    private readonly clinicFacilitiesService: ClinicFacilitiesService,
  ) {}

  @Post()
  create(@Body() createClinicFacilityDto: CreateClinicFacilityDto) {
    return this.clinicFacilitiesService.createOne(createClinicFacilityDto);
  }
}
