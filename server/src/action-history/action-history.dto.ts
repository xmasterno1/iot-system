import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class ActionHistoryDto {
  @ApiProperty()
  @Column()
  device: string;

  @ApiProperty()
  @Column()
  action: string;
}
