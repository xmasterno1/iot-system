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
import { DataSensorService } from './data-sensor.service';
import { CreateDataSensorDto } from './dto/create-data-sensor.dto';
import { UpdateDataSensorDto } from './dto/update-data-sensor.dto';
import {
  EFilterType,
  ESortByColumnType,
  ESortOrderType,
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
  create(@Body() createDataSensorDto: CreateDataSensorDto) {
    return this.dataSensorService.create(createDataSensorDto);
  }

  // pagination, seach, filter, sort
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
    name: 'search',
    type: String,
    required: false,
    description:
      'Enter the date you want to search for. For example: 2024-04-01',
  })
  @ApiQuery({
    name: 'filter',
    enum: EFilterType,
    required: false,
    description: 'Filter by Temperature, Humidity, Light or All',
  })
  @ApiQuery({
    name: 'sortByCol',
    enum: ESortByColumnType,
    required: false,
    description:
      'The column you want to sortcolumn you want to sort. Including: ID, temperature, humidity, light, time',
  })
  @ApiQuery({
    name: 'sortOrder',
    enum: ESortOrderType,
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
              totalRecords: 838,
              page: '1',
              limit: '5',
              data: [
                {
                  id: 1,
                  temperature: 23,
                  time: '2024-03-16 11:30:58',
                },
                {
                  id: 2,
                  temperature: 23,
                  time: '2024-03-16 11:31:01',
                },
                {
                  id: 3,
                  temperature: 24,
                  time: '2024-03-16 11:31:04',
                },
                {
                  id: 4,
                  temperature: 24,
                  time: '2024-03-16 11:31:07',
                },
                {
                  id: 5,
                  temperature: 23,
                  time: '2024-03-16 11:31:10',
                },
              ],
            },
          },
        },
      },
    },
  })
  getDataSensor(
    @Query('page') page: number = 1,
    @Query('rowsPerPage') rowsPerPage: number = 10,
    @Query('search') search: string = '',
    @Query('filter') filter: EFilterType = EFilterType.ALL,
    @Query('sortByCol') sortByCol: ESortByColumnType = ESortByColumnType.ID,
    @Query('sortOrder') sortOrder: ESortOrderType = ESortOrderType.ASC,
  ) {
    const resData = this.dataSensorService.getDataSensor(
      page,
      rowsPerPage,
      search,
      filter,
      sortByCol,
      sortOrder,
    );
    return resData;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dataSensorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDataSensorDto: UpdateDataSensorDto,
  ) {
    return this.dataSensorService.update(+id, updateDataSensorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataSensorService.remove(+id);
  }
}
