export interface AuthUser {
  sub: number;
  email: string;
  isSuperAdmin: boolean;
  iat: number;
  exp: number;
}
