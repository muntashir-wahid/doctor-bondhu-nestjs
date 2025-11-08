import { Injectable } from '@nestjs/common';
import { ClinicFacilities } from '../clinic-facilities.entry';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClinicFacilityDto } from '../dtos/create-clinic-facility.dto';
import { CatchAndThrowAsyncErrors } from 'src/utils/providers/catch-and-throw-async-errors';

@Injectable()
export class ClinicFacilitiesService {
  constructor(
    @InjectRepository(ClinicFacilities)
    private readonly facilities: Repository<ClinicFacilities>,
    private readonly catchAndThrowAsyncErrors: CatchAndThrowAsyncErrors,
  ) {}

  async createOne(createClinicFacilityDto: CreateClinicFacilityDto) {
    try {
      const clinicFacility = this.facilities.create(createClinicFacilityDto);
      return await this.facilities.save(clinicFacility);
    } catch (error) {
      this.catchAndThrowAsyncErrors.execute(error as Error);
    }
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
