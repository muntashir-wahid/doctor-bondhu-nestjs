import { Module } from '@nestjs/common';
import { ClinicsController } from './clinics.controller';

@Module({
  controllers: [ClinicsController]
})
export class ClinicsModule {}
