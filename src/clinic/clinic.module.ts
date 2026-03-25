import { Module } from '@nestjs/common';
import { ClinicController } from './clinic.controller';
import { ClinicService } from './providers/clinic.service';
import { ClinicsModule } from '../clinics/clinics.module';

@Module({
  controllers: [ClinicController],
  providers: [ClinicService],
  imports: [ClinicsModule],
})
export class ClinicModule {}
