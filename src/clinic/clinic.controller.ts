import { Controller, Get } from '@nestjs/common';
import {
  HasPermission,
  Role,
} from '../common/decorators/has-permission.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ClinicService } from './providers/clinic.service';

@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Get()
  @HasPermission(Role.ADMIN, Role.OWNER, Role.DOCTOR, Role.RECEPTIONIST)
  public getClinic(@CurrentUser('clinicUid') clinicUid: string) {
    return this.clinicService.getClinicInfo(clinicUid);
  }
}
