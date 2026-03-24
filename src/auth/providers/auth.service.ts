import { Injectable, UnauthorizedException } from '@nestjs/common';

import { SuperAdminLoginDto } from '../dtos/super-admini-login.dto';
import { UsersService } from 'src/users/providers/users.service';
import { JwtService } from '@nestjs/jwt';
import { HashingProvider } from '../../common/providers/hashing/hashing.provider';
import { ClinicUserLoginDto } from '../dtos/clinic-user-login.dto';
import { Status } from 'src/generated/prisma/enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingProvider: HashingProvider,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async superAdminLogin(superAdminLoginDto: SuperAdminLoginDto) {
    const { email, password } = superAdminLoginDto;

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException("Email or password doesn't match");
    }

    if (!user.isSuperAdmin) {
      throw new UnauthorizedException(
        "You don't have permission to access this resource",
      );
    }

    const isPasswordValid = await this.hashingProvider.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Email or password doesn't match");
    }

    const accessToken = await this.jwtService.signAsync({
      uid: user.uid,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isSuperAdmin: user.isSuperAdmin,
    });

    return {
      message: 'Super admin login successful',
      data: {
        accessToken,
        user: {
          uid: user.uid,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isSuperAdmin: user.isSuperAdmin,
        },
      },
    };
  }

  public async clinicUserLogin(clinicUserLoginDto: ClinicUserLoginDto) {
    const { email, password, clinicUid, role } = clinicUserLoginDto;
    const user = await this.usersService.findClinicUser({
      clinic: {
        uid: clinicUid,
        status: Status.ACTIVE,
      },
      role,
      status: Status.ACTIVE,
      user: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException("Email or password doesn't match");
    }

    const isPasswordValid = await this.hashingProvider.compare(
      password,
      user.user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Email or password doesn't match");
    }

    const accessToken = await this.jwtService.signAsync({
      uid: user.user.uid,
      clinicUid: user.clinicUid,
      email: user.user.email,
      role: user.role,
      isSuperAdmin: false,
    });

    return {
      message: 'Clinic user login successful',
      data: {
        accessToken,
        user: {
          uid: user.user.uid,
          email: user.user.email,
          firstName: user.user.firstName,
          lastName: user.user.lastName,
          clinicUid: user.clinicUid,
          clinicUserUid: user.uid,
          role: user.role,
        },
      },
    };
  }
}
