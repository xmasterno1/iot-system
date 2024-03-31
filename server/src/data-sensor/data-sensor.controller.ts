/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DataSensorService } from './data-sensor.service';
import { CreateDataSensorDto } from './dto/create-data-sensor.dto';
import { UpdateDataSensorDto } from './dto/update-data-sensor.dto';
import { DataSensor } from './entities/data-sensor.entity';

@Controller('data-sensor')
@ApiTags('Data Sensor')
export class DataSensorController {
  constructor(private readonly dataSensorService: DataSensorService) {}

  // create
  @Post()
  @ApiOperation({ summary: 'Create a new data' })
  @ApiBody({
    description: 'New data',
    type: CreateDataSensorDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Create successfully!',
    type: DataSensor,
  })
  create(@Body() createDataSensorDto: CreateDataSensorDto) {
    return this.dataSensorService.create(createDataSensorDto);
  }

  // get all data
  @Get()
  @ApiOperation({ summary: 'Get all data' })
  @ApiResponse({
    status: 200,
    description: 'All data',
    type: [DataSensor],
  })
  findAll() {
    return this.dataSensorService.findAll();
  }

  // Find data by ID
  @Get(':id')
  @ApiOperation({ summary: 'Find data via ID' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Data found via ID',
    type: DataSensor,
  })
  @ApiResponse({
    status: 404,
    description: 'Data with this ID is not found',
    type: DataSensor,
  })
  findOne(@Param('id') id: string) {
    return this.dataSensorService.findOne(Number(id));
  }

  // update via ID
  @Patch(':id')
  @ApiOperation({ summary: 'Update via ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID' })
  @ApiBody({ type: UpdateDataSensorDto, description: 'Expected data' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated',
    type: DataSensor,
  })
  update(
    @Param('id') id: string,
    @Body() updateDataSensorDto: UpdateDataSensorDto,
  ) {
    return this.dataSensorService.update(Number(id), updateDataSensorDto);
  }

  // delete via ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete data via ID' })
  @ApiResponse({
    status: 200,
    description: 'Delete successfully!',
  })
  remove(@Param('id') id: string) {
    return this.dataSensorService.remove(+id);
  }
}
