import { Injectable } from '@nestjs/common';
import { CreateClinicDto } from '../dtos/create-clinic.dto';
import { CreateClinicProvider } from './create-clinic.provider';

@Injectable()
export class ClinicsService {
  constructor(private readonly createClinicProvider: CreateClinicProvider) {}

  public create(createClinicDto: CreateClinicDto) {
    return this.createClinicProvider.execute(createClinicDto);
  }
}
