import { Module } from '@nestjs/common';
import { ActionHistoryService } from './action-history.service';
import { ActionHistoryController } from './action-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionHistory } from './entities/action-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActionHistory])],
  controllers: [ActionHistoryController],
  providers: [ActionHistoryService],
})
export class ActionHistoryModule {}
