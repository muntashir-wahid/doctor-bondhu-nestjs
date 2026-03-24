import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { VerifiedAuthUser } from '../interfaces/auth-user.interface';
import { REQUEST_USER_KEY } from '../constants/auth.constants';

@Injectable()
export class ClinicContextGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request[REQUEST_USER_KEY] as VerifiedAuthUser;

    if (!user) {
      throw new UnauthorizedException('Authentication required');
    }

    // Super admins can access any clinic
    if (user.isSuperAdmin) return true;

    const clinicUidFromParam = request.params.uid;
    const clinicUidFromHeader = request.headers['x-clinic-uid'] as
      | string
      | undefined;

    if (!clinicUidFromParam) {
      throw new ForbiddenException('Clinic UID param is required');
    }

    if (!clinicUidFromHeader) {
      throw new ForbiddenException('x-clinic-uid header is required');
    }

    // All three must agree: JWT payload, route param, and header
    if (
      user.clinicUid !== clinicUidFromParam ||
      user.clinicUid !== clinicUidFromHeader
    ) {
      throw new ForbiddenException('You do not have access to this clinic');
    }

    return true;
  }
}
