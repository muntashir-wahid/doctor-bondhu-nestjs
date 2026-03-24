import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateClinicDto } from './dtos/create-clinic.dto';
import { ClinicsService } from './providers/clinics.service';
import {
  HasPermission,
  Role,
} from '../common/decorators/has-permission.decorator';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ClinicContextGuard } from 'src/auth/guards/clinic-context.guard';

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

  @Public()
  @Get(':uid')
  getClinicById(@Param('uid') uid: string) {
    return this.clinicsService.findById(uid);
  }

  @Patch(':uid')
  @HasPermission(Role.ADMIN)
  @UseGuards(ClinicContextGuard)
  updateClinic() {
    return {
      message: 'Update clinic endpoint - to be implemented',
    };
  }
}
