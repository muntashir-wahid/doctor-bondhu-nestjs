import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../../auth/constants/auth.constants';

export enum Role {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  RECEPTIONIST = 'receptionist',
  PATIENT = 'patient',
}

export const HasPermission = (...roles: Role[]) =>
  SetMetadata(ROLES_KEY, roles);
