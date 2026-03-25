import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateClinicDto } from './dtos/create-clinic.dto';
import { ClinicsService } from './providers/clinics.service';
import {
  HasPermission,
  Role,
} from '../common/decorators/has-permission.decorator';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}
  @HasPermission(Role.SUPER_ADMIN)
  @Post()
  createClinic(@Body() createClinicDto: CreateClinicDto) {
    return this.clinicsService.create(createClinicDto);
  }

  @Public()
  @Get()
  getClinics(@CurrentUser('isSuperAdmin') isSuperAdmin: boolean) {
    console.log('Received request to get clinics. isSuperAdmin:', isSuperAdmin);
    return this.clinicsService.findAll({ isSuperAdmin });
  }

  @Public()
  @Get(':uid')
  getClinicById(@Param('uid') uid: string) {
    return this.clinicsService.findById(uid);
  }

  @Patch(':uid/status')
  @HasPermission(Role.SUPER_ADMIN)
  updateClinicStatus(@Param('uid') uid: string) {
    return this.clinicsService.toggleStatus(uid);
  }

  @Patch(':uid')
  @HasPermission(Role.SUPER_ADMIN)
  updateClinic(@Param('uid') uid: string) {
    console.log('Updating clinic with UID:', uid);
    return {
      message: 'Update clinic endpoint - to be implemented',
    };
  }
}
