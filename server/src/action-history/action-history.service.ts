import { Injectable } from '@nestjs/common';
import { ActionHistoryDto } from './dto/action-history.dto';
import { ActionHistory } from './entities/action-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EActionFilter, EActionSortColumn, ESortOrder } from 'src/common/types';
@Injectable()
export class ActionHistoryService {
  constructor(
    @InjectRepository(ActionHistory)
    private ActionHistoryRepository: Repository<ActionHistory>,
  ) {}

  async create(newAction: ActionHistoryDto) {
    const newActionHistory = this.ActionHistoryRepository.create(newAction);
    const savedData = await this.ActionHistoryRepository.save(newActionHistory);
    return savedData;
  }

  async getActionHistory(
    page: number,
    rowsPerPage: number,
    filter: EActionFilter,
    sortByCol: string,
    sortOrder: ESortOrder,
  ) {
    let query =
      this.ActionHistoryRepository.createQueryBuilder('actionHistory');

    switch (filter) {
      case EActionFilter.ON:
        query = query.where('actionHistory.action = :action', { action: 'ON' });
        break;
      case EActionFilter.OFF:
        query = query.where('actionHistory.action = :action', {
          action: 'OFF',
        });
        break;
      default:
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
        case EActionSortColumn.DEVICE_NAME:
          aValue = a.deviceName;
          bValue = b.deviceName;
          break;
        case EActionSortColumn.ACTION:
          aValue = a.action;
          bValue = b.action;
          break;
        case EActionSortColumn.TIME:
          aValue = a.time.getTime();
          bValue = b.time.getTime();
          break;
        default:
          aValue = a.id;
          bValue = b.id;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        if (sortOrder === ESortOrder.ASC) {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
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
    value: string,
    page: number,
    rowsPerPage: number,
    sortByCol: EActionSortColumn,
    sortOrder: ESortOrder,
  ) {
    const query =
      this.ActionHistoryRepository.createQueryBuilder('actionHistory');
    query.andWhere('actionHistory.deviceName = :value', { value });

    const numberOfRecordsToSkip = (page - 1) * rowsPerPage;
    const [data, totalRecords] = await query
      .skip(numberOfRecordsToSkip)
      .take(rowsPerPage)
      .getManyAndCount();

    // Sắp xếp dữ liệu
    data.sort((a, b) => {
      let aValue, bValue;

      switch (sortByCol) {
        case EActionSortColumn.DEVICE_NAME:
          aValue = a.deviceName;
          bValue = b.deviceName;
          break;
        case EActionSortColumn.ACTION:
          aValue = a.action;
          bValue = b.action;
          break;
        case EActionSortColumn.TIME:
          aValue = a.time.getTime();
          bValue = b.time.getTime();
          break;
        default:
          aValue = a.id;
          bValue = b.id;
      }
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        if (sortOrder === ESortOrder.ASC) {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
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
