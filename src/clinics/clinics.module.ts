import { Module } from '@nestjs/common';
import { ClinicsController } from './clinics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinic } from './entries/clinic.entity';
import { ClinicsService } from './providers/clinics.service';
import { CreateClinicWithValidation } from './providers/create-clinic-with-validation';
import { ClinicFacilitiesModule } from 'src/clinic-facilities/clinic-facilities.module';
import { ClinicServicesModule } from 'src/clinic-services/clinic-services.module';

@Module({
  controllers: [ClinicsController],
  imports: [
    TypeOrmModule.forFeature([Clinic]),
    ClinicFacilitiesModule,
    ClinicServicesModule,
  ],
  providers: [ClinicsService, CreateClinicWithValidation],
})
export class ClinicsModule {}
