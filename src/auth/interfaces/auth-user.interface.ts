import { Roles } from '../../generated/prisma/enums';

export interface AuthUser {
  sub: string;
  email: string;
  isSuperAdmin: boolean;
  role: string[];
  iat: number;
  exp: number;
}

export interface VerifiedAuthUser {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  isSuperAdmin: boolean;
  role?: Roles;
  clinicUid?: string;
}
