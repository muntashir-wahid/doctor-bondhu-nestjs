import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClinicDto } from '../dtos/create-clinic.dto';
import { PrismaExceptionsService } from 'src/prisma/providers/prisma-exceptions.service';
import { HashingProvider } from 'src/common/providers/hashing/hashing.provider';
import { Roles } from '../../generated/prisma/enums';

@Injectable()
export class CreateClinicProvider {
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaExceptionsService: PrismaExceptionsService,
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async execute(data: CreateClinicDto) {
    const { owner, facilities, workingHours, services, ...clinicData } = data;

    const hashedPassword = await this.hashingProvider.hash(owner.password);
    const slug = clinicData.name.toLowerCase().replace(/\s+/g, '-');

    try {
      const clinic = await this.prisma.$transaction(async (tx) => {
        // 1. Get or Create the owner user
        let ownerUser: Awaited<ReturnType<typeof tx.user.findUnique>>;
        const existingUser = await tx.user.findUnique({
          where: { email: owner.email },
        });
        if (existingUser) {
          ownerUser = existingUser;
        } else {
          ownerUser = await tx.user.create({
            data: {
              firstName: owner.firstName,
              lastName: owner.lastName,
              email: owner.email,
              password: hashedPassword,
            },
          });
        }

        // 2. Create the clinic
        const newClinic = await tx.clinic.create({
          data: { ...clinicData, slug },
        });

        // 3. Link the owner to the clinic with the OWNER role
        await tx.clinicUser.create({
          data: {
            clinicUid: newClinic.uid,
            userUid: ownerUser.uid,
            role: 'OWNER' as Roles,
          },
        });

        // 4. Bulk-insert services (if any)
        if (services?.length) {
          await tx.clinicService.createMany({
            data: services.map((s) => ({
              name: s.name,
              description: s.description,
              clinicUid: newClinic.uid,
            })),
          });
        }

        // 5. Bulk-insert facilities (if any)
        if (facilities?.length) {
          await tx.clinicFacility.createMany({
            data: facilities.map((f) => ({
              name: f.name,
              description: f.description,
              clinicUid: newClinic.uid,
            })),
          });
        }

        // 6. Bulk-insert working hours (if any)
        if (workingHours?.length) {
          await tx.clinicWorkingHour.createMany({
            data: workingHours.map((wh) => ({
              dayOfWeek: wh.dayOfWeek,
              openTime: wh.openTime,
              closeTime: wh.closeTime,
              clinicUid: newClinic.uid,
            })),
          });
        }

        return newClinic;
      });

      return {
        message: 'Clinic created successfully',
        data: clinic,
      };
    } catch (error) {
      this.prismaExceptionsService.handlePrismaError(error);
    }
  }
}
