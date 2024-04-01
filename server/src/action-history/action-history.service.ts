import { Injectable } from '@nestjs/common';
import { CreateActionHistoryDto } from './dto/create-action-history.dto';
import { UpdateActionHistoryDto } from './dto/update-action-history.dto';
import { ActionHistory } from './entities/action-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSensor } from 'src/data-sensor/entities/data-sensor.entity';
import { Repository } from 'typeorm';
import { ESortOrderType } from 'src/common/types';
@Injectable()
export class ActionHistoryService {
  constructor(
    @InjectRepository(ActionHistory)
    private ActionHistoryRepository: Repository<DataSensor>,
  ) {}

  async create(newAction: CreateActionHistoryDto) {
    const newActionHistory = this.ActionHistoryRepository.create(newAction);
    const savedData = await this.ActionHistoryRepository.save(newActionHistory);
    return savedData;
  }

  async getActionHistory(
    page: number,
    rowsPerPage: number,
    search: string,
    filter: string,
    sortbyCol: string,
    sortOrder: ESortOrderType,
  ) {
    let query =
      this.ActionHistoryRepository.createQueryBuilder('actionHistory');

    if (search) {
      const searchKey = new Date(search);

      // Create start and end time limits for the day
      const startDate = new Date(searchKey);
      startDate.setHours(0, 0, 0); // 0:0:0
      const endDate = new Date(searchKey);
      endDate.setHours(23, 59, 59); // 23:59:59

      query = query
        .where('actionHistory.time >= :startDate', { startDate })
        .andWhere('actionHistory.time <= :endDate', { endDate });
    }

    if (filter !== 'all') {
      query = query.where('actionHistory.device = :device', {
        device: filter,
      });
    }

    if (sortbyCol === 'time') {
      query = query.orderBy(`actionHistory.${sortbyCol}`, sortOrder);
    } else {
      query = query.orderBy('actionHistory.id', sortOrder);
    }
    const totalRecords = await query.getCount();
    const numberOfRecordsToSkip = (page - 1) * rowsPerPage;
    const data = await query
      .skip(numberOfRecordsToSkip)
      .take(rowsPerPage)
      .getMany();

    const resData = { totalRecords, page, rowsPerPage, data };
    return resData;
  }

  findOne(id: number) {
    return `This action returns a #${id} actionHistory`;
  }

  update(id: number, updateActionHistoryDto: UpdateActionHistoryDto) {
    return `This action updates a #${id} actionHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} actionHistory`;
  }
}
