import { PartialType } from '@nestjs/swagger';
import { CreateDataSensorDto } from './create-data-sensor.dto';

export class UpdateDataSensorDto extends PartialType(CreateDataSensorDto) {}
