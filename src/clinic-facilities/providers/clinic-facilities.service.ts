import { BadRequestException, Injectable } from '@nestjs/common';
import { ClinicFacilities } from '../clinic-facilities.entry';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClinicFacilityDto } from '../dtos/create-clinic-facility.dto';

@Injectable()
export class ClinicFacilitiesService {
  constructor(
    @InjectRepository(ClinicFacilities)
    private readonly facilities: Repository<ClinicFacilities>,
  ) {}

  async createOne(createClinicFacilityDto: CreateClinicFacilityDto) {
    const isExisting = await this.facilities.findOneBy({
      name: createClinicFacilityDto.name,
    });

    if (isExisting) {
      throw new BadRequestException('Clinic facility already exists');
    }

    const clinicFacility = this.facilities.create(createClinicFacilityDto);
    return await this.facilities.save(clinicFacility);
  }

  async findManyByIds(ids?: number[]): Promise<ClinicFacilities[]> {
    if (!ids) {
      return [];
    }

    const facilities = await this.facilities.findBy({
      id: In(ids),
    });

    return facilities;
  }
}
