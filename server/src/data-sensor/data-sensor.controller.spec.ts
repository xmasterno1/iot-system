import { Test, TestingModule } from '@nestjs/testing';
import { DataSensorController } from './data-sensor.controller';
import { DataSensorService } from './data-sensor.service';

describe('DataSensorController', () => {
  let controller: DataSensorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataSensorController],
      providers: [DataSensorService],
    }).compile();

    controller = module.get<DataSensorController>(DataSensorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
