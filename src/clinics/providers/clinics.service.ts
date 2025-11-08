import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clinic } from '../entries/clinic.entity';
import { Repository } from 'typeorm';
import { CreateClinicDto } from '../dtos/create-clinic.dto';

@Injectable()
export class ClinicsService {
  constructor(
    @InjectRepository(Clinic)
    private readonly clinic: Repository<Clinic>,
  ) {}

  public async createClinic(createClinicDto: CreateClinicDto) {
    const isExisting = await this.clinic.findOne({
      where: [
        { name: createClinicDto.name },
        { email: createClinicDto.email },
        { phoneNumber: createClinicDto.phoneNumber },
      ],
    });

    if (isExisting) {
      throw new BadRequestException(
        'Clinic with the same name, email, or phone number already exists.',
      );
    }

    let clinic = this.clinic.create(createClinicDto);
    clinic = await this.clinic.save(clinic);
    return clinic;
  }
}
