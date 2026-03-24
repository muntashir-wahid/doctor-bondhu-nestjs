import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

import { IS_PUBLIC_KEY, REQUEST_USER_KEY } from '../constants/auth.constants';
import { Reflector } from '@nestjs/core';
import { VerifiedAuthUser } from '../interfaces/auth-user.interface';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    const clinicUid = this.extractClinicUidFromHeader(request);

    if (isPublic && !token) return true;

    if (!isPublic && !token) {
      throw new UnauthorizedException('Authorization token is missing');
    }

    if (isPublic && token) {
      try {
        const payload: VerifiedAuthUser =
          await this.jwtService.verifyAsync<VerifiedAuthUser>(token, {
            secret: this.configService.get<string>('JWT_SECRET'),
          });

        const user = await this.userService.findById(payload.uid);

        if (!user) {
          throw new UnauthorizedException('User not found');
        }

        request[REQUEST_USER_KEY] = user.data;
      } catch (error) {
        console.error('JWT verification failed:', error);
        throw new UnauthorizedException(
          'Invalid or expired authorization token',
        );
      }

      return true;
    }

    if (!isPublic && token) {
      try {
        const payload: VerifiedAuthUser =
          await this.jwtService.verifyAsync<VerifiedAuthUser>(token, {
            secret: this.configService.get<string>('JWT_SECRET'),
          });

        const user = await this.userService.findById(payload.uid);

        if (!user) {
          throw new UnauthorizedException('User not found');
        }

        request[REQUEST_USER_KEY] = user.data;
      } catch (error) {
        console.error('JWT verification failed:', error);
        throw new UnauthorizedException(
          'Invalid or expired authorization token',
        );
      }

      return true;
    }

    return false;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  private extractClinicUidFromHeader(request: Request): string | undefined {
    return request.headers['x-clinic-uid'] as string | undefined;
  }
}
