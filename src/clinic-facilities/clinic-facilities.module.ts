import { Module } from '@nestjs/common';
import { ClinicFacilitiesController } from './clinic-facilities.controller';
import { ClinicFacilitiesService } from './providers/clinic-facilities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicFacilities } from './clinic-facilities.entry';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  controllers: [ClinicFacilitiesController],
  providers: [ClinicFacilitiesService],
  imports: [TypeOrmModule.forFeature([ClinicFacilities]), UtilsModule],
  exports: [ClinicFacilitiesService],
})
export class ClinicFacilitiesModule {}
