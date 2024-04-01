import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'datasensor' })
export class DataSensor {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  temperature: number;

  @ApiProperty()
  @Column()
  humidity: number;

  @ApiProperty()
  @Column()
  light: number;

  @ApiProperty()
  @Column()
  time: Date;
}
