import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'datasensor' })
export class DataSensor {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'float' })
  temperature: number;

  @ApiProperty()
  @Column({ type: 'float' })
  humidity: number;

  @ApiProperty()
  @Column({ type: 'float' })
  light: number;

  @ApiProperty()
  @Column({ type: 'datetime' })
  time: Date;
}
