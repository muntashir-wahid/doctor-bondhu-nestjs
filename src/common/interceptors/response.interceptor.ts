interface IResponseData<T> {
  success?: boolean;
  message?: string;
  data?: T;
  meta?: {
    [key: string]: any;
  };
}

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: IResponseData<T>) => ({
        success: true,
        message: data?.message ?? 'Request successful',
        timestamp: new Date().toISOString(),
        ...(data?.data ? { data: data.data } : {}),
        ...(data?.meta ? { meta: data.meta } : {}),
      })),
    );
  }
}
