import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ControlDto } from './dto/control.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  async getChartData() {
    const data = await this.appService.getChartData();
    return data;
  }
  @Post('')
  async controlDevice(@Body() controlDto: ControlDto) {
    await this.appService.controlDevice(controlDto);
  }

  @Get('data-sensor')
  @ApiQuery({
    name: 'searchValue',
    required: false,
  })
  @ApiQuery({
    name: 'field',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    required: false,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
  })
  async getDataSensor(
    @Query('searchValue') searchValue: string = '',
    @Query('field') field: string = '',
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('sortBy') sortBy: string = 'createdAt',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
  ) {
    const data = await this.appService.getDataSensor(
      searchValue,
      field,
      page,
      pageSize,
      sortBy,
      sortOrder,
    );
    return data;
  }

  @Get('action-history')
  @ApiQuery({
    name: 'searchValue',
    required: false,
  })
  @ApiQuery({
    name: 'field',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    required: false,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
  })
  @ApiQuery({
    name: 'filter',
    required: false,
  })
  async getActionHistory(
    @Query('searchValue') searchValue: string = '',
    @Query('field') field: string = '',
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('sortBy') sortBy: string = 'createdAt',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
    @Query('filter') filter: string = '',
  ) {
    const data = await this.appService.getActionHistory(
      searchValue,
      field,
      page,
      pageSize,
      sortBy,
      sortOrder,
      filter,
    );
    return data;
  }
}
