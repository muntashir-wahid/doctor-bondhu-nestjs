import { Injectable } from '@nestjs/common';
import { ServerEntryResponseDto } from './dtos/server-entry-response.dto';

@Injectable()
export class AppService {
  getHello(): ServerEntryResponseDto {
    return {
      status: 'success',
      message: 'Welcome to Doctor Bondhu API!',
    };
  }
}
