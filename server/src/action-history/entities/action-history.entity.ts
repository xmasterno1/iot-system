/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum ActionEnum {
  ON = 'on',
  OFF = 'off',
}

@Entity({ name: 'actionhistory' })
export class ActionHistory {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  deviceId: number;

  @ApiProperty()
  @Column({ type: 'enum', enum: ActionEnum })
  action: ActionEnum;

  @Column()
  @ApiProperty()
  time: Date;
}
