import { Module } from '@nestjs/common';
import { CatchAndThrowAsyncErrors } from './providers/catch-and-throw-async-errors';
import { PaginatedList } from './providers/paginated-list.provider';

@Module({
  providers: [CatchAndThrowAsyncErrors, PaginatedList],
  exports: [CatchAndThrowAsyncErrors, PaginatedList],
})
export class UtilsModule {}
