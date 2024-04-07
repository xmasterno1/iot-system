import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { EActionType } from 'src/common/types';

@Entity({ name: 'actionhistory' })
export class ActionHistory {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  deviceName: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: EActionType })
  action: EActionType;

  @ApiProperty()
  @Column({ type: 'datetime' })
  time: Date;
}
