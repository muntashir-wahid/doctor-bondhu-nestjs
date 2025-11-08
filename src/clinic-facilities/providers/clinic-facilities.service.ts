import { BadRequestException, Injectable } from '@nestjs/common';
import { ClinicFacilities } from '../clinic-facilities.entry';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClinicFacilityDto } from '../dtos/create-clinic-facility.dto';

@Injectable()
export class ClinicFacilitiesService {
  constructor(
    @InjectRepository(ClinicFacilities)
    private readonly clinic: Repository<ClinicFacilities>,
  ) {}

  async createClinicFacility(createClinicFacilityDto: CreateClinicFacilityDto) {
    const isExisting = await this.clinic.findOneBy({
      name: createClinicFacilityDto.name,
    });

    if (isExisting) {
      throw new BadRequestException('Clinic facility already exists');
    }

    const clinicFacility = this.clinic.create(createClinicFacilityDto);
    return await this.clinic.save(clinicFacility);
  }
}
