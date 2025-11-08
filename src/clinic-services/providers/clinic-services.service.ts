import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicService } from '../clinic-service.entry';
import { Repository } from 'typeorm';
import { CreateClinicServiceDto } from '../dtos/create-clinic-service.dto';

@Injectable()
export class ClinicServicesService {
  constructor(
    @InjectRepository(ClinicService)
    private readonly clinicService: Repository<ClinicService>,
  ) {}

  async createClinicService(createClinicServiceDto: CreateClinicServiceDto) {
    const isExisting = await this.clinicService.findOneBy({
      name: createClinicServiceDto.name,
    });

    if (isExisting) {
      throw new BadRequestException('Clinic service already exists');
    }

    const clinicService = this.clinicService.create(createClinicServiceDto);
    return await this.clinicService.save(clinicService);
  }
}
