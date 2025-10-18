import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { ServerEntryResponseDto } from './dtos/server-entry-response.dto';

@ApiTags('Server Entry')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Welcome message returned successfully',
    type: ServerEntryResponseDto,
  })
  getHello(): ServerEntryResponseDto {
    return this.appService.getHello();
  }
}
