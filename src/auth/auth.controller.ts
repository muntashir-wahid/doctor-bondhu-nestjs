import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
// import { ClinicUserLoginDto } from './dtos/clinic-user-login.dto';
import { SuperAdminLoginDto } from './dtos/super-admini-login.dto';
import { AuthService } from './providers/auth.service';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('/login')
  // login(@Body() clinicUserLoginDto: ClinicUserLoginDto) {}

  @Post('/adminum-login')
  @HttpCode(HttpStatus.OK)
  public adminLogin(@Body() superAdminLoginDto: SuperAdminLoginDto) {
    return this.authService.superAdminLogin(superAdminLoginDto);
  }
}
