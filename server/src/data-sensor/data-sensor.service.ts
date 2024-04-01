import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDataSensorDto } from './dto/create-data-sensor.dto';
import { UpdateDataSensorDto } from './dto/update-data-sensor.dto';
import {
  EFilterType,
  ESortByColumnType,
  ESortOrderType,
} from 'src/common/types';
import { Repository } from 'typeorm';
import { DataSensor } from './entities/data-sensor.entity';

@Injectable()
export class DataSensorService {
  constructor(
    @InjectRepository(DataSensor)
    private DataSensorRepository: Repository<DataSensor>,
  ) {}

  async create(newData: CreateDataSensorDto) {
    const newDataSensor = this.DataSensorRepository.create(newData);
    const savedData = await this.DataSensorRepository.save(newDataSensor);
    return savedData;
  }

  async getDataSensor(
    page: number,
    rowsPerPage: number,
    search: string,
    filter: EFilterType,
    sortByCol: ESortByColumnType,
    sortOrder: ESortOrderType,
  ) {
    let query = this.DataSensorRepository.createQueryBuilder('dataSensor');

    // search via time: yyy-mm-dd ==> Ex: 2024-04-02
    if (search) {
      const searchKey = new Date(search);

      // Create start and end time limits for the day
      const startDate = new Date(searchKey);
      startDate.setHours(0, 0, 0); // 0:0:0
      const endDate = new Date(searchKey);
      endDate.setHours(23, 59, 59); // 23:59:59

      query = query
        .where('dataSensor.time >= :startDate', { startDate })
        .andWhere('dataSensor.time <= :endDate', { endDate });
    }

    switch (filter) {
      case EFilterType.TEMPERATURE:
        query = query
          .select('dataSensor.id')
          .addSelect('dataSensor.temperature')
          .addSelect('dataSensor.time');
        break;
      case EFilterType.HUMIDITY:
        query = query
          .select('dataSensor.id')
          .addSelect('dataSensor.humidity')
          .addSelect('dataSensor.time');
        break;
      case EFilterType.LIGHT:
        query = query
          .select('dataSensor.id')
          .addSelect('dataSensor.light')
          .addSelect('dataSensor.time');
        break;
      default:
        break;
    }

    const totalRecords = await query.getCount();
    const numberOfRecordsToSkip = (page - 1) * rowsPerPage;
    let sortedColumn;

    switch (sortByCol) {
      case ESortByColumnType.TEMPERATURE:
        sortedColumn = 'dataSensor.temperature';
        break;
      case ESortByColumnType.TEMPERATURE:
        sortedColumn = 'dataSensor.temperature';
        break;
      case ESortByColumnType.TEMPERATURE:
        sortedColumn = 'dataSensor.temperature';
        break;
      default:
        sortedColumn = 'dataSensor.id';
    }

    const data = await query
      .orderBy(sortedColumn, sortOrder)
      .skip(numberOfRecordsToSkip)
      .take(rowsPerPage)
      .getMany();

    const resData = { totalRecords, page, rowsPerPage, data };

    return resData;
  }

  findOne(id: number) {
    return `This action returns a #${id} dataSensor`;
  }

  update(id: number, updateDataSensorDto: UpdateDataSensorDto) {
    return `This action updates a #${id} dataSensor`;
  }

  remove(id: number) {
    return `This action removes a #${id} dataSensor`;
  }
}
