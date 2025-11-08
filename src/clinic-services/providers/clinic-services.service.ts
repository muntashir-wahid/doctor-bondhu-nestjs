import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicService } from '../clinic-service.entry';
import { In, Repository } from 'typeorm';
import { CreateClinicServiceDto } from '../dtos/create-clinic-service.dto';
import { CatchAndThrowAsyncErrors } from 'src/utils/providers/catch-and-throw-async-errors';

@Injectable()
export class ClinicServicesService {
  constructor(
    @InjectRepository(ClinicService)
    private readonly clinicService: Repository<ClinicService>,

    private readonly catchAndThrowAsyncErrors: CatchAndThrowAsyncErrors,
  ) {}

  async createOne(createClinicServiceDto: CreateClinicServiceDto) {
    try {
      const clinicService = this.clinicService.create(createClinicServiceDto);
      return await this.clinicService.save(clinicService);
    } catch (error) {
      this.catchAndThrowAsyncErrors.execute(error as Error);
    }
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
