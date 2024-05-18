import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ActionHistoryService } from './action-history.service';
import { ActionHistoryDto } from './action-history.dto';
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

  // search
  @Get('search')
  @ApiOperation({
    summary: 'Search via device, action, createAt or full text search',
  })
  @ApiQuery({
    name: 'searchValue',
    type: String,
    required: false,
    description: 'Type value you want to search',
  })
  @ApiQuery({
    name: 'field',
    type: String,
    required: false,
    description: 'Field you want to search: device, action or createdAt',
  })
  @ApiQuery({
    name: 'filter',
    type: Object,
    required: false,
    description: 'Filter via device: led, fan or both',
  })
  @ApiQuery({
    name: 'sortBy',
    type: String,
    required: false,
    description:
      'The column you want to sortcolumn you want to sort. Including: id, device, action, createdAt',
  })
  @ApiQuery({
    name: 'sortOrder',
    enum: ['ASC', 'DESC'],
    required: false,
    description:
      'The order you want to sort. "ASC" = ascending, "DESC" = descending',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Which page do you want to get data from?',
  })
  @ApiQuery({
    name: 'pageSize',
    type: Number,
    required: false,
    description: 'How many records do you want each page to display?',
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
  async getData(
    @Query('searchValue') searchValue: string,
    @Query('field') field: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('sortBy') sortBy: string = 'id',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
  ) {
    const resData = this.actionHistoryService.getData(
      searchValue,
      field,
      page,
      pageSize,
      sortBy,
      sortOrder,
    );
    return resData;
  }
}
