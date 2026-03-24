import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaExceptionsService } from 'src/prisma/providers/prisma-exceptions.service';
import { IFindAllClinicsQueryParams } from '../interfaces/query-params.interface';
import { Status } from 'src/generated/prisma/enums';

@Injectable()
export class ClinicsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaExceptionsService: PrismaExceptionsService,
  ) {}

  public async findAll(queryParams: IFindAllClinicsQueryParams) {
    let whereClause = {};

    console.log('Query Params:', queryParams); // Debug log to check incoming query parameters

    if (!queryParams.isSuperAdmin) {
      whereClause = {
        status: Status.ACTIVE,
      };
    }

    console.log('Where Clause:', whereClause); // Debug log to check the constructed where clause

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
}
