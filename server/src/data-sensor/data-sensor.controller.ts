import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { DataSensorService } from './data-sensor.service';
import { DataSensorDto } from './data-sensor.dto';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@Controller('data-sensor')
@ApiTags('Data Sensor')
export class DataSensorController {
  constructor(private readonly dataSensorService: DataSensorService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new record of data sensor',
  })
  create(@Body() createDataSensorDto: DataSensorDto) {
    return this.dataSensorService.create(createDataSensorDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Search via temperature, humidity, light or full text search',
  })
  @ApiQuery({
    name: 'searchValue',
    type: Number,
    required: false,
    description: 'Type value you want to search',
  })
  @ApiQuery({
    name: 'field',
    type: String,
    required: false,
    description:
      'Field you want to search: temperature, humidity, light or createdAt',
  })
  @ApiQuery({
    name: 'sortBy',
    type: String,
    required: false,
    description:
      'The column you want to sortcolumn you want to sort. Including: id, temperature, humidity, light, createdAt',
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
              totalRecords: 13,
              page: '1',
              rowsPerPage: '3',
              data: [
                {
                  id: 2,
                  temperature: 22,
                  humidity: 62,
                  light: 290,
                  time: '2024-03-06T12:53:48.000Z',
                },
                {
                  id: 3,
                  temperature: 22,
                  humidity: 61,
                  light: 295,
                  time: '2024-05-18T21:10:29.000Z',
                },
                {
                  id: 1,
                  temperature: 22,
                  humidity: 60,
                  light: 300,
                  time: '2024-01-10T01:24:15.000Z',
                },
              ],
            },
          },
        },
      },
    },
  })
  getData(
    @Query('searchValue') searchValue: string,
    @Query('field') field: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('sortBy') sortBy: string = 'id',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
  ) {
    const resData = this.dataSensorService.getData(
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
