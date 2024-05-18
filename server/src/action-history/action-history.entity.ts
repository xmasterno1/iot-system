import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'action_history' })
export class ActionHistory {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  device: string;

  @ApiProperty()
  @Column()
  action: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
}
