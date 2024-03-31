import { ApiProperty } from '@nestjs/swagger';

export class CreateDataSensorDto {
  @ApiProperty()
  temperature: number;

  @ApiProperty()
  humidity: number;

  @ApiProperty()
  light: number;
  @ApiProperty()
  time: Date;
}
