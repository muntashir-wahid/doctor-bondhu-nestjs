import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clinic } from '../clinic.entity';
import { Repository } from 'typeorm';
import { CreateClinicDto } from '../dtos/create-clinic.dto';

@Injectable()
export class ClinicsService {
  constructor(
    @InjectRepository(Clinic)
    private readonly clinic: Repository<Clinic>,
  ) {}

  public async createClinic(createClinicDto: CreateClinicDto) {
    let clinic = this.clinic.create(createClinicDto);
    clinic = await this.clinic.save(clinic);
    return clinic;
  }
}
