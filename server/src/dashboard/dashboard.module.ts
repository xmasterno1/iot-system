import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSensor } from 'src/data-sensor/data-sensor.entity';
import { DashboardService } from './dashboard.service';
import { ActionHistory } from 'src/action-history/action-history.entity';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DataSensor, ActionHistory])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
