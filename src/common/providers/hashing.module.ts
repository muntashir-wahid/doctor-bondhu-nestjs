import { Module } from '@nestjs/common';
import { BcryptProvider } from './hashing/bcrypt.provider';
import { HashingProvider } from './hashing/hashing.provider';

@Module({
  providers: [
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
  ],
  exports: [HashingProvider],
})
export class HashingModule {}
