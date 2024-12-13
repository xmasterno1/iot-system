import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
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

  @Column({ type: 'float', nullable: true })
  wind: number;

  @ApiProperty({ description: 'createdAt' })
  @CreateDateColumn()
  createdAt: Date;
}
