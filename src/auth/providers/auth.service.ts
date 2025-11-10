import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from 'src/users/providers/hashing.provider';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly JwtService: JwtService,
  ) {}

  public async login(loginDto: LoginDto) {
    // Find user by email
    const user = await this.usersService.findByEmail(loginDto.email);

    // If user not found, throw error
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare passwords
    const isPasswordValid = await this.hashingProvider.comparePassword(
      loginDto.password,
      user.password as string,
    );

    // If password is invalid, throw error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Remove password before returning user object
    delete user.password;

    // Generate JWT token
    const token = await this.JwtService.signAsync({
      id: user.id,
      email: user.email,
      department: user.department,
    });

    return { message: 'Login successful', data: { accessToken: token } };
  }
}
