import { Injectable } from '@nestjs/common';
import { CreateClinicDto } from '../dtos/create-clinic.dto';
import { CreateClinicProvider } from './create-clinic.provider';
import { ClinicsRepository } from '../repo/clinics.repository';
import { IFindAllClinicsQueryParams } from '../interfaces/query-params.interface';

@Injectable()
export class ClinicsService {
  constructor(
    private readonly createClinicProvider: CreateClinicProvider,
    private readonly clinicsRepository: ClinicsRepository,
  ) {}

  public create(createClinicDto: CreateClinicDto) {
    return this.createClinicProvider.execute(createClinicDto);
  }

  public async findAll(queryParams: IFindAllClinicsQueryParams) {
    const clinics = await this.clinicsRepository.findAll(queryParams);
    return {
      message: 'Clinics fetched successfully',
      data: clinics,
    };
  }
}
