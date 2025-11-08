import { Module } from '@nestjs/common';
import { ClinicsController } from './clinics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinic } from './entries/clinic.entity';
import { ClinicsService } from './providers/clinics.service';

@Module({
  controllers: [ClinicsController],
  imports: [TypeOrmModule.forFeature([Clinic])],
  providers: [ClinicsService],
})
export class ClinicsModule {}
