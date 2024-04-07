import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ActionHistoryService } from './action-history.service';
import { ActionHistoryDto } from './dto/action-history.dto';
import { EActionFilter, EActionSortColumn, ESortOrder } from 'src/common/types';
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
  @ApiOperation({
    summary: 'Create a new record of action history',
  })
  create(@Body() createActionHistoryDto: ActionHistoryDto) {
    return this.actionHistoryService.create(createActionHistoryDto);
  }

  // filter, sort & pagination
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
    name: 'filter',
    enum: EActionFilter,
    required: false,
    description: 'Filter by ALL, ON or OFF',
  })
  @ApiQuery({
    name: 'sortByCol',
    enum: EActionSortColumn,
    required: false,
    description:
      'The column you want to sort: ID, Device name, Action or Time ?',
  })
  @ApiQuery({
    name: 'sortOrder',
    enum: ESortOrder,
    required: false,
    description:
      'The order you want to sort. For example: ASC = ascending, DESC = descending',
  })
  @ApiCreatedResponse({
    status: 200,
    description: 'Get data successfully',
    content: {
      'application/json': {
        examples: {
          data: {
            value: {
              totalRecords: 46,
              page: '1',
              rowsPerPage: '5',
              data: [
                {
                  id: 1,
                  deviceName: 'D6',
                  action: 'OFF',
                  time: '2/11/2024, 1:00:22 PM',
                },
                {
                  id: 2,
                  deviceName: 'D7',
                  action: 'ON',
                  time: '12/28/2024, 12:20:22 PM',
                },
                {
                  id: 3,
                  deviceName: 'D7',
                  action: 'OFF',
                  time: '10/23/2024, 6:59:59 AM',
                },
                {
                  id: 4,
                  deviceName: 'D6',
                  action: 'ON',
                  time: '4/1/2024, 5:48:32 PM',
                },
                {
                  id: 5,
                  deviceName: 'D7',
                  action: 'OFF',
                  time: '8/25/2024, 3:59:17 AM',
                },
              ],
            },
          },
        },
      },
    },
  })
  async getAll(
    @Query('page') page: number = 1,
    @Query('rowsPerPage') rowsPerPage: number = 5,
    @Query('filter') filter: EActionFilter = EActionFilter.ALL,
    @Query('sortByCol') sortByCol: EActionSortColumn = EActionSortColumn.ID,
    @Query('sortOrder') sortOrder: ESortOrder = ESortOrder.ASC,
  ) {
    const data = await this.actionHistoryService.getActionHistory(
      page,
      rowsPerPage,
      filter,
      sortByCol,
      sortOrder,
    );
    console.log(data);
    return data;
  }

  // search
  @Get('search')
  @ApiOperation({
    summary: 'Search via device name',
  })
  @ApiQuery({
    name: 'value',
    type: String,
    description: 'Name of device you want to search',
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
    name: 'sortByCol',
    enum: EActionSortColumn,
    required: false,
    description:
      'The column you want to sortcolumn you want to sort. Including: ID, temperature, humidity, light, time',
  })
  @ApiQuery({
    name: 'sortOrder',
    enum: ESortOrder,
    required: false,
    description:
      'The order you want to sort. For example: ASC = ascending, DESC = descending',
  })
  @ApiCreatedResponse({
    description: 'Get data successfully',
    content: {
      'application/json': {
        examples: {
          data: {
            value: {
              totalRecords: 21,
              page: '1',
              rowsPerPage: '5',
              data: [
                {
                  id: 1,
                  deviceName: 'D6',
                  action: 'OFF',
                  time: '2/11/2024, 1:00:22 PM',
                },
                {
                  id: 4,
                  deviceName: 'D6',
                  action: 'ON',
                  time: '4/1/2024, 5:48:32 PM',
                },
                {
                  id: 7,
                  deviceName: 'D6',
                  action: 'OFF',
                  time: '5/28/2024, 7:03:08 AM',
                },
                {
                  id: 10,
                  deviceName: 'D6',
                  action: 'ON',
                  time: '1/29/2024, 5:51:22 PM',
                },
                {
                  id: 13,
                  deviceName: 'D6',
                  action: 'ON',
                  time: '11/10/2024, 12:53:27 AM',
                },
              ],
            },
          },
        },
      },
    },
  })
  async getViaSearch(
    @Query('value') value: string,
    @Query('page') page: number = 1,
    @Query('rowsPerPage') rowsPerPage: number = 5,
    @Query('sortByCol') sortByCol: EActionSortColumn = EActionSortColumn.ID,
    @Query('sortOrder') sortOrder: ESortOrder = ESortOrder.ASC,
  ) {
    if (value) {
      const resData = this.actionHistoryService.getViaSearch(
        value,
        page,
        rowsPerPage,
        sortByCol,
        sortOrder,
      );
      return resData;
    }
  }
}
