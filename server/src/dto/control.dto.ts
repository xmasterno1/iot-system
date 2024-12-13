import { ApiProperty } from '@nestjs/swagger';

export class ControlDto {
  @ApiProperty()
  topic: string;

  @ApiProperty()
  message: string;
}
