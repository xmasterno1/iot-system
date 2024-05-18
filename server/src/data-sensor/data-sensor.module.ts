import { Module } from '@nestjs/common';
import { DataSensorService } from './data-sensor.service';
import { DataSensorController } from './data-sensor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSensor } from './data-sensor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DataSensor])],
  controllers: [DataSensorController],
  providers: [DataSensorService],
})
export class DataSensorModule {}
