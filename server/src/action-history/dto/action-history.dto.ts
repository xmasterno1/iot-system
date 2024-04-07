import { ApiProperty } from '@nestjs/swagger';
import { EActionType } from 'src/common/types';

export class ActionHistoryDto {
  @ApiProperty()
  deviceName: string;

  @ApiProperty()
  action: EActionType;

  @ApiProperty()
  time: Date;
}
