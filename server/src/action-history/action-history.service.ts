import { Injectable } from '@nestjs/common';
import { ActionHistoryDto } from './action-history.dto';
import { ActionHistory } from './action-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async getData(
    searchValue: string,
    field: string,
    page: number,
    pageSize: number,
    sortBy: string,
    sortOrder: 'ASC' | 'DESC' = 'ASC',
  ) {
    const query =
      this.ActionHistoryRepository.createQueryBuilder('actionHistory');
    query.andWhere('actionHistory.deviceName LIKE :value', {
      value: `%${searchValue}%`,
    });

    const numberOfRecordsToSkip = (page - 1) * pageSize;
    const [data, totalRecords] = await query
      .orderBy(`actionHistory.${sortBy}`, sortOrder)
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
