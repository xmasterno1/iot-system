import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSensorDto } from './data-sensor.dto';
import { Repository } from 'typeorm';
import { DataSensor } from './data-sensor.entity';

@Injectable()
export class DataSensorService {
  constructor(
    @InjectRepository(DataSensor)
    private DataSensorRepository: Repository<DataSensor>,
  ) {}

  async create(newData: DataSensorDto) {
    const newDataSensor = this.DataSensorRepository.create(newData);
    const savedData = await this.DataSensorRepository.save(newDataSensor);
    return savedData;
  }

  async getData(
    searchValue: string,
    field: string,
    page: number,
    pageSize: number,
    sortBy: string,
    sortOrder: 'ASC' | 'DESC' = 'ASC',
  ) {
    const query = this.DataSensorRepository.createQueryBuilder('dataSensor');
    if (field && ['temp', 'hum', 'light'].includes(field)) {
      // Nếu field là temp, hum hoặc light, tìm kiếm chính xác theo giá trị số
      query.where(`dataSensor.${field} = :searchValue`, {
        searchValue: Number(searchValue),
      });
    } else if (searchValue) {
      // Nếu field là chuỗi rỗng, tìm kiếm theo ký tự ở tất cả các trường
      query.where(
        `dataSensor.id = :searchValue 
        OR dataSensor.temp = :searchValue 
        OR dataSensor.hum = :searchValue 
        OR dataSensor.light = :searchValue 
        OR dataSensor.createdAt LIKE :searchString`,
        { searchValue: Number(searchValue), searchString: `%${searchValue}%` },
      );
    }

    const numberOfRecordsToSkip = (page - 1) * pageSize;
    const [data, totalRecords] = await query
      .orderBy(`dataSensor.${sortBy}`, sortOrder)
      .skip(numberOfRecordsToSkip)
      .take(pageSize)
      .getManyAndCount();

    const resData = {
      totalRecords,
      page,
      pageSize,
      data,
    };

    return resData;
  }
}
