import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSensorModule } from './data-sensor/data-sensor.module';
import { DataSensor } from './data-sensor/entities/data-sensor.entity';
import { ActionHistoryModule } from './action-history/action-history.module';
import { ActionHistory } from './action-history/entities/action-history.entity';
import * as dotenv from 'dotenv';

// Load .env file
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [DataSensor, ActionHistory],
      synchronize: true,
    }),
    DataSensorModule,
    ActionHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
