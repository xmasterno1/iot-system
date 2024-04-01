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
  deviceId: number;

  @ApiProperty()
  @Column({ type: 'enum', enum: EActionType })
  action: EActionType;

  @Column()
  @ApiProperty()
  time: Date;
}
