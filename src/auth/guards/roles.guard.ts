import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../common/decorators/has-permission.decorator';
import { ROLES_KEY } from '../constants/auth.constants';
import { Request } from 'express';
import { VerifiedAuthUser } from '../interfaces/auth-user.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user: VerifiedAuthUser = request['user'] as VerifiedAuthUser;

    if (!user) {
      return false;
    }

    if (user.isSuperAdmin === requiredRoles.includes(Role.SUPER_ADMIN)) {
      return true;
    }

    if (user.role) {
      return requiredRoles.includes(user.role as Role);
    }

    return false;
  }
}
