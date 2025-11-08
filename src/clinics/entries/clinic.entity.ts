import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Status } from 'src/users/enums/user.enum';
import { ClinicFacilities } from 'src/clinic-facilities/clinic-facilities.entry';
import { ClinicService } from 'src/clinic-services/clinic-service.entry';

@Entity('clinics')
export class Clinic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    unique: true,
  })
  email?: string;

  @Column({
    type: 'varchar',
    length: 14,
    nullable: false,
    unique: true,
  })
  phoneNumber: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => ClinicFacilities, { onDelete: 'CASCADE' })
  @JoinTable({})
  facilities?: ClinicFacilities[];

  @ManyToMany(() => ClinicService, { onDelete: 'CASCADE' })
  @JoinTable({})
  services?: ClinicService[];
}
