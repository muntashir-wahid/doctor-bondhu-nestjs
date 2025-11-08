import { Module } from '@nestjs/common';
import { ClinicFacilitiesController } from './clinic-facilities.controller';
import { ClinicFacilitiesService } from './providers/clinic-facilities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicFacilities } from './clinic-facilities.entry';

@Module({
  controllers: [ClinicFacilitiesController],
  providers: [ClinicFacilitiesService],
  imports: [TypeOrmModule.forFeature([ClinicFacilities])],
})
export class ClinicFacilitiesModule {}
