import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaExceptionsService } from 'src/prisma/providers/prisma-exceptions.service';
import { IFindAllClinicsQueryParams } from '../interfaces/query-params.interface';

@Injectable()
export class ClinicsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaExceptionsService: PrismaExceptionsService,
  ) {}

  public async findAll(queryParams: IFindAllClinicsQueryParams) {
    try {
      const clinics = await this.prisma.clinic.findMany();
      return clinics;
    } catch (error) {
      this.prismaExceptionsService.handlePrismaError(
        error,
        'Failed to fetch clinics',
      );
    }
  }
}
