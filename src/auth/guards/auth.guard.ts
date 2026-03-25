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

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      if (isPublic) return true;
      throw new UnauthorizedException('Authorization token is missing');
    }

    return this.verifyAndEnrichUser(request, token, isPublic);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractClinicUidFromHeader(request: Request): string | undefined {
    return request.headers['x-clinic-uid'] as string | undefined;
  }

  private async verifyAndEnrichUser(
    request: Request,
    token: string,
    isPublic: boolean,
  ): Promise<boolean> {
    try {
      const payload = await this.jwtService.verifyAsync<VerifiedAuthUser>(
        token,
        {
          secret: this.configService.get<string>('JWT_SECRET'),
        },
      );

      if (!payload.isSuperAdmin) {
        const clinicUid = this.extractClinicUidFromHeader(request);
        if (!clinicUid || clinicUid !== payload.clinicUid) {
          throw new UnauthorizedException('Clinic context mismatch');
        }
      }

      request[REQUEST_USER_KEY] = {
        uid: payload.uid,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        isSuperAdmin: payload.isSuperAdmin,
        role: payload.role,
        clinicUid: payload.clinicUid,
      } satisfies VerifiedAuthUser;

      return true;
    } catch (error) {
      if (isPublic) return true;
      if (error instanceof UnauthorizedException) throw error;
      throw new UnauthorizedException('Invalid or expired authorization token');
    }
  }
}
