import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ActionHistory {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Device' })
  @Column()
  device: string;

  @ApiProperty({ description: 'Device' })
  @Column()
  action: string;

  @ApiProperty({ description: 'createdAt' })
  @CreateDateColumn()
  createdAt: Date;
}
