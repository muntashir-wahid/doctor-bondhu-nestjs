import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserDepartment } from './enums/user-department.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 56,
    nullable: false,
  })
  fullName: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    select: false,
  })
  password?: string;

  @Column({
    type: 'enum',
    enum: UserDepartment,
    default: UserDepartment.CLINIC,
  })
  department: UserDepartment = UserDepartment.CLINIC;

  @CreateDateColumn()
  createdAt: Date;
}
