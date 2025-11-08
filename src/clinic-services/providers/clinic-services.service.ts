import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicService } from '../clinic-service.entry';
import { In, Repository } from 'typeorm';
import { CreateClinicServiceDto } from '../dtos/create-clinic-service.dto';
import { CatchAndThrowAsyncErrors } from 'src/utils/providers/catch-and-throw-async-errors';
import { PaginatedList } from 'src/utils/providers/paginated-list.provider';

@Injectable()
export class ClinicServicesService {
  constructor(
    @InjectRepository(ClinicService)
    private readonly clinicService: Repository<ClinicService>,

    private readonly catchAndThrowAsyncErrors: CatchAndThrowAsyncErrors,
    private readonly paginatedList: PaginatedList<ClinicService>,
  ) {}

  async createOne(createClinicServiceDto: CreateClinicServiceDto) {
    try {
      const clinicService = this.clinicService.create(createClinicServiceDto);
      return await this.clinicService.save(clinicService);
    } catch (error) {
      this.catchAndThrowAsyncErrors.execute(error as Error);
    }
  }

  async findAll(page = 1, limit = 10) {
    const [items, totalCount] = await this.clinicService.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return this.paginatedList.create(
      items,
      totalCount,
      page,
      limit,
      'services',
    );
  }

  async findManyByIds(ids?: number[]): Promise<ClinicService[]> {
    if (!ids) {
      return [];
    }

    const services = await this.clinicService.findBy({
      id: In(ids),
    });

    return services;
  }
}
