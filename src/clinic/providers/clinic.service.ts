import { Injectable } from '@nestjs/common';
import { ClinicsService } from '../../clinics/providers/clinics.service';

@Injectable()
export class ClinicService {
  constructor(private readonly clinicsService: ClinicsService) {}

  public async getClinicInfo(clinicUid: string) {
    const clinic = await this.clinicsService.findById(clinicUid);
    return clinic;
  }
}
