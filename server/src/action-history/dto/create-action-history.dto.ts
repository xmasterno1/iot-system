/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { ActionEnum } from '../entities/action-history.entity';

export class CreateActionHistoryDto {
  @ApiProperty()
  deviceId: number;
  @ApiProperty()
  action: ActionEnum;
  @ApiProperty()
  time: Date;
}
