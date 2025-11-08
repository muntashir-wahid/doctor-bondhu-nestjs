import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clinic } from '../entries/clinic.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateClinicDto } from '../dtos/create-clinic.dto';
import { ClinicFacilities } from 'src/clinic-facilities/clinic-facilities.entry';

@Injectable()
export class ClinicsService {
  constructor(
    @InjectRepository(Clinic)
    private readonly clinic: Repository<Clinic>,
    private readonly dataSource: DataSource,
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

    let newClinic: Clinic;

    // Create Query Runner Instance
    const queryRunner = this.dataSource.createQueryRunner();

    // Connect Query Runner to the Datasource
    await queryRunner.connect();

    // Start Transaction
    await queryRunner.startTransaction();

    const facilities: ClinicFacilities[] = [];
    try {
      if (createClinicDto.facilities?.length) {
        for (const facilityId of createClinicDto.facilities) {
          const facility = await queryRunner.manager.findOneBy(
            ClinicFacilities,
            {
              id: facilityId,
            },
          );

          if (!facility) {
            throw new BadRequestException('No facility found.');
          }

          facilities.push(facility);
        }
      }

      console.log(facilities);

      const payload = {
        ...createClinicDto,
        facilities,
      };

      newClinic = queryRunner.manager.create(Clinic, payload);
      newClinic = await queryRunner.manager.save(newClinic);

      await queryRunner.commitTransaction();

      return newClinic;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(err);
    } finally {
      await queryRunner.release();
    }
  }
}
