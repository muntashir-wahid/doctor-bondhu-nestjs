import { Injectable } from '@nestjs/common';
import { ClinicFacilities } from '../clinic-facilities.entry';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClinicFacilityDto } from '../dtos/create-clinic-facility.dto';
import { CatchAndThrowAsyncErrors } from 'src/utils/providers/catch-and-throw-async-errors';
import { PaginatedList } from 'src/utils/providers/paginated-list.provider';

@Injectable()
export class ClinicFacilitiesService {
  constructor(
    @InjectRepository(ClinicFacilities)
    private readonly facilities: Repository<ClinicFacilities>,
    private readonly catchAndThrowAsyncErrors: CatchAndThrowAsyncErrors,
    private readonly paginatedList: PaginatedList<ClinicFacilities>,
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

  async findAll(page = 1, limit = 10) {
    const [items, total] = await this.facilities.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return this.paginatedList.create(items, total, page, limit, 'facilities');
  }
}
