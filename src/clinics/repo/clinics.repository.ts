import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaExceptionsService } from 'src/prisma/providers/prisma-exceptions.service';
import { IFindAllClinicsQueryParams } from '../interfaces/query-params.interface';
import { Status } from '../../generated/prisma/enums';
import { Prisma } from '../../generated/prisma/client';

@Injectable()
export class ClinicsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaExceptionsService: PrismaExceptionsService,
  ) {}

  public async findAll(queryParams: IFindAllClinicsQueryParams) {
    let whereClause = {};

    if (!queryParams.isSuperAdmin) {
      whereClause = {
        status: Status.ACTIVE,
      };
    }

    try {
      const clinics = await this.prisma.clinic.findMany({ where: whereClause });
      return clinics;
    } catch (error) {
      this.prismaExceptionsService.handlePrismaError(
        error,
        'Failed to fetch clinics',
      );
    }
  }

  public async findById(id: string) {
    try {
      const clinic = await this.prisma.clinic.findUnique({
        where: { uid: id },
        include: {
          clinicFacilities: true,
          clinicServices: true,
          clinicWorkingHours: true,
        },
      });
      return clinic;
    } catch (error) {
      this.prismaExceptionsService.handlePrismaError(
        error,
        'Failed to fetch clinic',
      );
    }
  }

  public async updateById(uid: string, data: Prisma.ClinicUpdateInput) {
    try {
      const updatedClinic = await this.prisma.clinic.update({
        where: { uid },
        data,
      });
      return updatedClinic;
    } catch (error) {
      this.prismaExceptionsService.handlePrismaError(
        error,
        'Failed to update clinic',
      );
    }
  }
}
