import { Module } from '@nestjs/common';
import { ClinicsController } from './clinics.controller';
import { ClinicsService } from './providers/clinics.service';
import { ClinicsRepository } from './repo/clinics.repository';
import { CreateClinicProvider } from './providers/create-clinic.provider';
import { HashingModule } from '../common/providers/hashing.module';

@Module({
  controllers: [ClinicsController],
  providers: [ClinicsService, ClinicsRepository, CreateClinicProvider],
  imports: [HashingModule],
  exports: [ClinicsService],
})
export class ClinicsModule {}
