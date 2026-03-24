import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { CreateClinicDto } from './dtos/create-clinic.dto';
import { ClinicsService } from './providers/clinics.service';
import {
  HasPermission,
  Role,
} from '../common/decorators/has-permission.decorator';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

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
    return this.clinicsService.findAll({ isSuperAdmin });
  }

  @Patch(':uid')
  updateClinic() {
    return {
      message: 'Update clinic endpoint - to be implemented',
    };
  }
}
