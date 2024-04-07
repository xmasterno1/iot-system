import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSensorDto } from './dto/data-sensor.dto';
import {
  EDataFilter,
  EDataSearchField,
  EDataSortColumn,
  ESortOrder,
} from 'src/common/types';
import { Repository } from 'typeorm';
import { DataSensor } from './entities/data-sensor.entity';

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

  async getAll(
    page: number,
    rowsPerPage: number,
    filter: EDataFilter,
    sortByCol: EDataSortColumn,
    sortOrder: ESortOrder,
  ) {
    const query = this.DataSensorRepository.createQueryBuilder('dataSensor');

    switch (filter) {
      case EDataFilter.TEMPERATURE:
        query
          .select('dataSensor.id')
          .addSelect('dataSensor.temperature')
          .addSelect('dataSensor.time');
        break;
      case EDataFilter.HUMIDITY:
        query
          .select('dataSensor.id')
          .addSelect('dataSensor.humidity')
          .addSelect('dataSensor.time');
        break;
      case EDataFilter.LIGHT:
        query
          .select('dataSensor.id')
          .addSelect('dataSensor.light')
          .addSelect('dataSensor.time');
        break;
      default:
        break;
    }

    const numberOfRecordsToSkip = (page - 1) * rowsPerPage;
    const [data, totalRecords] = await query
      .skip(numberOfRecordsToSkip)
      .take(rowsPerPage)
      .getManyAndCount();

    // Sắp xếp dữ liệu
    data.sort((a, b) => {
      let aValue, bValue;

      switch (sortByCol) {
        case EDataSortColumn.TEMPERATURE:
          aValue = a.temperature;
          bValue = b.temperature;
          break;
        case EDataSortColumn.HUMIDITY:
          aValue = a.humidity;
          bValue = b.humidity;
          break;
        case EDataSortColumn.LIGHT:
          aValue = a.light;
          bValue = b.light;
          break;
        case EDataSortColumn.TIME:
          aValue = a.time.getTime();
          bValue = b.time.getTime();
          break;
        default:
          aValue = a.id;
          bValue = b.id;
      }

      if (aValue === bValue) return 0;
      if (sortOrder === ESortOrder.ASC) {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });

    const formattedData = data.map((item) => {
      return {
        ...item,
        time: new Date(item.time).toLocaleString(),
      };
    });

    const resData = { totalRecords, page, rowsPerPage, data: formattedData };

    return resData;
  }

  async getViaSearch(
    value: number,
    field: EDataSearchField,
    page: number,
    rowsPerPage: number,
    sortByCol: EDataSortColumn,
    sortOrder: ESortOrder,
  ) {
    const query = this.DataSensorRepository.createQueryBuilder('dataSensor');

    switch (field) {
      case EDataSearchField.TEMPERATURE:
        query.andWhere('dataSensor.temperature = :value', { value });
        break;
      case EDataSearchField.HUMIDITY:
        query.andWhere('dataSensor.humidity = :value', { value });
        break;
      case EDataSearchField.LIGHT:
        query.andWhere('dataSensor.light = :value', { value });
        break;
      default:
        break;
    }

    const numberOfRecordsToSkip = (page - 1) * rowsPerPage;
    const [data, totalRecords] = await query
      .skip(numberOfRecordsToSkip)
      .take(rowsPerPage)
      .getManyAndCount();

    // Sắp xếp dữ liệu
    data.sort((a, b) => {
      let aValue, bValue;

      switch (sortByCol) {
        case EDataSortColumn.TEMPERATURE:
          aValue = a.temperature;
          bValue = b.temperature;
          break;
        case EDataSortColumn.HUMIDITY:
          aValue = a.humidity;
          bValue = b.humidity;
          break;
        case EDataSortColumn.LIGHT:
          aValue = a.light;
          bValue = b.light;
          break;
        case EDataSortColumn.TIME:
          aValue = a.time.getTime();
          bValue = b.time.getTime();
          break;
        default:
          aValue = a.id;
          bValue = b.id;
      }

      if (aValue === bValue) return 0;
      if (sortOrder === ESortOrder.ASC) {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });

    const formattedData = data.map((item) => {
      return {
        ...item,
        time: new Date(item.time).toLocaleString(),
      };
    });

    const resData = {
      totalRecords,
      page,
      rowsPerPage,
      data: formattedData,
    };

    return resData;
  }
}
