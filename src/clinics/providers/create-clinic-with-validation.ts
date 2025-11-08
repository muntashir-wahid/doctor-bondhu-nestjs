// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateClinicDto } from '../dtos/create-clinic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Clinic } from '../entries/clinic.entity';
import { ClinicFacilitiesService } from 'src/clinic-facilities/providers/clinic-facilities.service';
import { ClinicServicesService } from 'src/clinic-services/providers/clinic-services.service';

@Injectable()
export class CreateClinicWithValidation {
  constructor(
    @InjectRepository(Clinic)
    private readonly clinic: Repository<Clinic>,

    private readonly clinicFacilitiesService: ClinicFacilitiesService,
    private readonly clinicServicesService: ClinicServicesService,
  ) {}

  public async execute(createClinicDto: CreateClinicDto) {
    try {
      const facilities = await this.clinicFacilitiesService.findManyByIds(
        createClinicDto.facilities,
      );

      if (facilities.length !== createClinicDto.facilities?.length) {
        throw new BadRequestException(
          'One or more clinic facilities are invalid',
        );
      }

      const services = await this.clinicServicesService.findManyByIds(
        createClinicDto.services,
      );

      if (services.length !== createClinicDto.services?.length) {
        throw new BadRequestException(
          'One or more clinic services are invalid',
        );
      }

      const payload = {
        ...createClinicDto,
        facilities,
        services,
      };

      const clinic = this.clinic.create(payload);
      await this.clinic.save(clinic);
      return clinic;
    } catch (error) {
      console.log(error);

      if (error instanceof QueryFailedError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (error.driverError.code === '23505') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          throw new ConflictException(error.driverError.detail as string);
        }
      } else if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
