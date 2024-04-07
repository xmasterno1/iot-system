import { ApiProperty } from '@nestjs/swagger';

export class DataSensorDto {
  @ApiProperty()
  temperature: number;

  @ApiProperty()
  humidity: number;

  @ApiProperty()
  light: number;

  @ApiProperty()
  time: Date;
}
