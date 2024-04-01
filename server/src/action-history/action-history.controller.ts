import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ActionHistoryService } from './action-history.service';
import { CreateActionHistoryDto } from './dto/create-action-history.dto';
import { UpdateActionHistoryDto } from './dto/update-action-history.dto';
import { ESortOrderType } from 'src/common/types';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@Controller('action-history')
@ApiTags('Action History')
export class ActionHistoryController {
  constructor(private readonly actionHistoryService: ActionHistoryService) {}

  @Post()
  create(@Body() createActionHistoryDto: CreateActionHistoryDto) {
    return this.actionHistoryService.create(createActionHistoryDto);
  }

  // pagination, seach, filter, sort
  @Get()
  @ApiOperation({
    summary: 'Get data in action history',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Which page do you want to get data from?',
  })
  @ApiQuery({
    name: 'rowsPerPage',
    type: Number,
    required: false,
    description: 'How many records do you want each page to display?',
  })
  @ApiQuery({
    name: 'search',
    type: String,
    required: false,
    description:
      'Enter the date you want to search for. For example: 2024-04-01',
  })
  @ApiQuery({
    name: 'filter',
    enum: ['all', 'device'],
    required: false,
    description: 'Filter by Device or All',
  })
  @ApiQuery({
    name: 'sortByCol',
    enum: ['id', 'time'],
    required: false,
    description: 'The column you want to sort: ID or Time ?',
  })
  @ApiQuery({
    name: 'sortOrder',
    enum: ESortOrderType,
    required: false,
    description:
      'The order you want to sort. For example: ASC = ascending, DESC = descending',
  })
  @ApiCreatedResponse({
    status: 200,
    description: 'Get data by conditions',
    content: {
      'application/json': {
        examples: {
          data: {
            value: {
              totalRecords: 43,
              page: '1',
              rowsPerPage: '5',
              data: [
                {
                  id: 1,
                  time: '2024-03-16 09:32:31',
                  device: 'D6',
                  action: 'ON',
                },
                {
                  id: 5,
                  time: '2024-03-16 09:33:24',
                  device: 'D6',
                  action: 'OFF',
                },
                {
                  id: 7,
                  time: '2024-03-16 09:33:27',
                  device: 'D7',
                  action: 'OFF',
                },
                {
                  id: 11,
                  time: '2024-03-16 09:33:44',
                  device: 'D7',
                  action: 'ON',
                },
                {
                  id: 13,
                  time: '2024-03-16 10:20:34',
                  device: 'D6',
                  action: 'ON',
                },
              ],
            },
          },
        },
      },
    },
  })
  async getActionHistory(
    @Query('page') page: number = 1,
    @Query('rowsPerPage') rowsPerPage: number = 5,
    @Query('search') search: string = '',
    @Query('filter') filter: 'all' | 'device' = 'all',
    @Query('sortByCol') sortByCol: 'id' | 'time' = 'id',
    @Query('sortOrder') sortOrder: ESortOrderType = ESortOrderType.ASC,
  ) {
    const data = await this.actionHistoryService.getActionHistory(
      page,
      rowsPerPage,
      search,
      filter,
      sortByCol,
      sortOrder,
    );
    console.log(data);
    return data;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actionHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActionHistoryDto: UpdateActionHistoryDto,
  ) {
    return this.actionHistoryService.update(+id, updateActionHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actionHistoryService.remove(+id);
  }
}
