import { ApiProperty } from '@nestjs/swagger';
import { EActionType } from 'src/common/types';

export class CreateActionHistoryDto {
  @ApiProperty()
  deviceId: number;

  @ApiProperty()
  action: EActionType;

  @ApiProperty()
  time: Date;
}
