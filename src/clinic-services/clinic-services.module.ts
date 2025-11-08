import { Module } from '@nestjs/common';
import { ClinicServicesController } from './clinic-services.controller';
import { ClinicServicesService } from './providers/clinic-services.service';
import { ClinicService } from './clinic-service.entry';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  controllers: [ClinicServicesController],
  providers: [ClinicServicesService],
  imports: [TypeOrmModule.forFeature([ClinicService]), UtilsModule],
  exports: [ClinicServicesService],
})
export class ClinicServicesModule {}
