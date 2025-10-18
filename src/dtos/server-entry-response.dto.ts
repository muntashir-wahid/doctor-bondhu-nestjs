import { ApiProperty } from '@nestjs/swagger';

export class ServerEntryResponseDto {
  @ApiProperty({
    description: 'Status of the response',
    example: 'success',
  })
  status: string;

  @ApiProperty({
    description: 'Welcome message',
    example: 'Welcome to Doctor Bondhu API!',
  })
  message: string;
}
