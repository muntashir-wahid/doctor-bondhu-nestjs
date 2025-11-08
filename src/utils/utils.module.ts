import { Module } from '@nestjs/common';
import { CatchAndThrowAsyncErrors } from './providers/catch-and-throw-async-errors';

@Module({
  providers: [CatchAndThrowAsyncErrors],
  exports: [CatchAndThrowAsyncErrors],
})
export class UtilsModule {}
