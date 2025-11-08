import { Module } from '@nestjs/common';
import { ClinicServicesController } from './clinic-services.controller';
import { ClinicServicesService } from './providers/clinic-services.service';

@Module({
  controllers: [ClinicServicesController],
  providers: [ClinicServicesService],
})
export class ClinicServicesModule {}
