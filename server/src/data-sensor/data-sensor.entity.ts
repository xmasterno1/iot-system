import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'data_sensor' })
export class DataSensor {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'float' })
  temp: number;

  @ApiProperty()
  @Column({ type: 'float' })
  hum: number;

  @ApiProperty()
  @Column({ type: 'float' })
  light: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
}
