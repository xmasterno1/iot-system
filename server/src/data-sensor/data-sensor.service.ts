import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSensor } from './entities/data-sensor.entity';
import { Repository } from 'typeorm';
import { UpdateDataSensorDto } from './dto/update-data-sensor.dto';
import { CreateDataSensorDto } from './dto/create-data-sensor.dto';

@Injectable()
export class DataSensorService {
  constructor(
    @InjectRepository(DataSensor)
    private DataSensorRepository: Repository<DataSensor>,
  ) {}
  async findAll() {
    return await this.DataSensorRepository.find();
  }
  async findOne(id: number) {
    return await this.DataSensorRepository.findOneBy({ id });
  }
  async create(newData: CreateDataSensorDto) {
    const newDataSensor = this.DataSensorRepository.create(newData);
    const savedData = await this.DataSensorRepository.save(newDataSensor);
    return savedData;
  }
  async update(id: number, newData: UpdateDataSensorDto) {
    const newDataSensor = this.DataSensorRepository.create(newData);
    const exitedData = await this.DataSensorRepository.findOneBy({ id });

    if (!exitedData) {
      throw new HttpException('Data not found', 404);
    }
    const savedData = await this.DataSensorRepository.update(id, newDataSensor);
    return savedData;
  }
  async remove(id: number) {
    await this.DataSensorRepository.delete(id);
    return 'Delete successfully';
  }
}
