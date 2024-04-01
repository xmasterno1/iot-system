import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSensor } from 'src/data-sensor/entities/data-sensor.entity';
import { MqttService } from './mqtt.service';
import { ActionHistory } from 'src/action-history/entities/action-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActionHistory, DataSensor])],
  providers: [MqttService],
})
export class MqttModule {}
