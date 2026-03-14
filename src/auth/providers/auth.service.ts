import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HashingProvider } from 'src/common/providers/hashing/hashing.provider';

import { SuperAdminLoginDto } from '../dtos/super-admini-login.dto';
import { UsersService } from 'src/users/providers/users.service';
import { JwtService } from '@nestjs/jwt';

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
      uid: user.uid as string,
      email: user.email,
      isSuperAdmin: user.isSuperAdmin,
    });

    return {
      message: 'Super admin login successful',
      data: {
        accessToken,
        user: {
          uid: user.uid as string,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isSuperAdmin: user.isSuperAdmin,
        },
      },
    };
  }
}
