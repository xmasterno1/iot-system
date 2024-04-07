import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { DataSensorService } from './data-sensor.service';
import { DataSensorDto } from './dto/data-sensor.dto';
import {
  EDataFilter,
  EDataSearchField,
  EDataSortColumn,
  ESortOrder,
} from 'src/common/types';
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

  // filter, sort & pagination
  @Get()
  @ApiOperation({
    summary: 'Get data in data sensor',
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
    enum: EDataFilter,
    required: false,
    description: 'Filter by Temperature, Humidity, Light or All',
  })
  @ApiQuery({
    name: 'sortByCol',
    enum: EDataSortColumn,
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
              totalRecords: 25,
              page: '1',
              rowsPerPage: '5',
              data: [
                {
                  id: 2,
                  humidity: 62,
                  time: '2024-03-06T12:53:48.000Z',
                },
                {
                  id: 3,
                  humidity: 61,
                  time: '2024-05-18T21:10:29.000Z',
                },
                {
                  id: 1,
                  humidity: 60,
                  time: '2024-01-10T01:24:15.000Z',
                },
                {
                  id: 5,
                  humidity: 59,
                  time: '2024-09-30T08:07:42.000Z',
                },
                {
                  id: 4,
                  humidity: 58,
                  time: '2024-07-18T06:29:55.000Z',
                },
              ],
            },
          },
        },
      },
    },
  })
  getAll(
    @Query('page') page: number = 1,
    @Query('rowsPerPage') rowsPerPage: number = 5,
    @Query('filter') filter: EDataFilter = EDataFilter.ALL,
    @Query('sortByCol') sortByCol: EDataSortColumn = EDataSortColumn.ID,
    @Query('sortOrder') sortOrder: ESortOrder = ESortOrder.ASC,
  ) {
    const resData = this.dataSensorService.getAll(
      page,
      rowsPerPage,
      filter,
      sortByCol,
      sortOrder,
    );
    return resData;
  }

  // search
  @Get('search')
  @ApiOperation({
    summary: 'Search via temperature, humidity or light',
  })
  @ApiQuery({
    name: 'value',
    type: Number,
    description: 'Value you want to search',
  })
  @ApiQuery({
    name: 'searchField',
    enum: EDataSearchField,
    description: 'Field you want to search: temperature, humidity or light',
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
    enum: EDataSortColumn,
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
  getViaSearch(
    @Query('value') value: number,
    @Query('searchField') searchField: EDataSearchField,
    @Query('page') page: number = 1,
    @Query('rowsPerPage') rowsPerPage: number = 5,
    @Query('sortByCol') sortByCol: EDataSortColumn = EDataSortColumn.ID,
    @Query('sortOrder') sortOrder: ESortOrder = ESortOrder.ASC,
  ) {
    if (value && searchField) {
      const resData = this.dataSensorService.getViaSearch(
        value,
        searchField,
        page,
        rowsPerPage,
        sortByCol,
        sortOrder,
      );
      return resData;
    }
  }
}
