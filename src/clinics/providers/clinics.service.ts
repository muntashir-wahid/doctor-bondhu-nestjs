import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clinic } from '../entries/clinic.entity';
import { Repository } from 'typeorm';
import { CreateClinicDto } from '../dtos/create-clinic.dto';
import { CreateClinicWithValidation } from './create-clinic-with-validation';

@Injectable()
export class ClinicsService {
  constructor(
    @InjectRepository(Clinic)
    private readonly clinic: Repository<Clinic>,

    private readonly createClinicWithValidation: CreateClinicWithValidation,
  ) {}

  public async createOne(createClinicDto: CreateClinicDto) {
    return this.createClinicWithValidation.execute(createClinicDto);
  }

  /*
  public async createClinic(createClinicDto: CreateClinicDto): Promise<Clinic> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Validate and fetch facilities if provided
      const facilities = await this.validateAndFetchFacilities(
        createClinicDto.facilities,
        queryRunner,
      );

      this.logger.log(`Creating clinic with ${facilities.length} facilities`);

      const payload = {
        ...createClinicDto,
        facilities,
      };

      const newClinic = queryRunner.manager.create(Clinic, payload);
      const savedClinic = await queryRunner.manager.save(newClinic);

      await queryRunner.commitTransaction();

      this.logger.log(`Clinic created successfully with ID: ${savedClinic.id}`);
      return savedClinic;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(
        'Failed to create clinic',
        error instanceof Error ? error.stack : String(error),
      );

      // Handle unique constraint violations
      if (error instanceof Error && this.isUniqueConstraintError(error)) {
        throw this.handleUniqueConstraintError(error, createClinicDto);
      }

      // Re-throw custom exceptions (like BadRequestException from facility validation)
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to create clinic');
    } finally {
      await queryRunner.release();
    }
  }

  private async validateAndFetchFacilities(
    facilityIds: number[] | undefined,
    queryRunner: QueryRunner,
  ): Promise<ClinicFacilities[]> {
    if (!facilityIds?.length) {
      return [];
    }

    // Bulk fetch facilities for better performance
    const facilities = await queryRunner.manager.findBy(ClinicFacilities, {
      id: In(facilityIds),
    });

    if (facilities.length !== facilityIds.length) {
      const foundIds = facilities.map((f: ClinicFacilities) => f.id);
      const missingIds = facilityIds.filter((id) => !foundIds.includes(id));
      throw new BadRequestException(
        `Facilities with IDs [${missingIds.join(', ')}] not found`,
      );
    }

    return facilities;
  }

  private isUniqueConstraintError(error: Error & { code?: string }): boolean {
    return (
      error.code === '23505' || // PostgreSQL unique violation
      error.code === 'ER_DUP_ENTRY' || // MySQL duplicate entry
      error.message?.includes('unique constraint') ||
      error.message?.includes('duplicate key') ||
      error.message?.includes('UNIQUE constraint failed')
    );
  }

  private handleUniqueConstraintError(
    error: Error & { detail?: string; constraint?: string },
    dto: CreateClinicDto,
  ): ConflictException {
    const errorMessage = error.detail || error.message || '';
    const constraintName = error.constraint || '';

    // Check for specific constraint violations
    if (
      errorMessage.includes('name') ||
      constraintName.includes('name') ||
      errorMessage.includes(dto.name)
    ) {
      return new ConflictException(
        `Clinic with name '${dto.name}' already exists`,
      );
    }

    if (
      errorMessage.includes('email') ||
      constraintName.includes('email') ||
      (dto.email && errorMessage.includes(dto.email))
    ) {
      return new ConflictException(
        `Clinic with email '${dto.email}' already exists`,
      );
    }

    if (
      errorMessage.includes('phoneNumber') ||
      errorMessage.includes('phone') ||
      constraintName.includes('phone') ||
      errorMessage.includes(dto.phoneNumber)
    ) {
      return new ConflictException(
        `Clinic with phone number '${dto.phoneNumber}' already exists`,
      );
    }

    // Generic fallback
    return new ConflictException('Clinic with provided details already exists');
  }

  */
}
