/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateActionHistoryDto } from './dto/create-action-history.dto';
import { UpdateActionHistoryDto } from './dto/update-action-history.dto';
import { ActionHistory } from './entities/action-history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActionHistoryService {
  constructor(
    @InjectRepository(ActionHistory)
    private ActionHistoryRepository: Repository<ActionHistory>,
  ) {}
  async create(createActionHistoryDto: CreateActionHistoryDto) {
    const newAction = this.ActionHistoryRepository.create(
      createActionHistoryDto,
    );

    const res = await this.ActionHistoryRepository.save(newAction);
    // console.log("New action: ", res);
    return res;
  }
  async findAll() {
    const res = await this.ActionHistoryRepository.find();
    // console.log('All action history: ', res);
    return res;
  }
  // async findOne(id: number) {
  //   const res = await this.findOne(id);
  //   return res;
  // }
  async update(id: number, updateActionHistoryDto: UpdateActionHistoryDto) {
    const actionHistory = await this.ActionHistoryRepository.findOneBy({ id });
    if (!actionHistory) {
      throw new HttpException('Action history not found', 404);
    }
    await this.ActionHistoryRepository.update(id, updateActionHistoryDto);
    return await this.ActionHistoryRepository.findOneBy({ id });
  }
  async remove(id: number) {
    await this.ActionHistoryRepository.delete(id);
    return `Delete successfully`;
  }
}
