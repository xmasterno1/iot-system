import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class DataSensorDto {
  @ApiProperty()
  @Column({ type: 'float' })
  temperature: number;

  @ApiProperty()
  @Column({ type: 'float' })
  humidity: number;

  @ApiProperty()
  @Column({ type: 'float' })
  light: number;
}
