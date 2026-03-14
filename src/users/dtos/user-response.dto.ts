import { Exclude } from 'class-transformer';

export class UserResponseDto {
  @Exclude()
  password: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
