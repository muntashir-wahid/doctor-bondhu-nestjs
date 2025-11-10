import { UserDepartment } from 'src/users/enums/user-department.enum';

export interface AuthUser {
  id: number;
  email: string;
  iat: number;
  exp: number;
  department: UserDepartment;
}
