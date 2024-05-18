import { Body, Controller, Post } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ControlDto } from './control.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post()
  async controlDevice(@Body() controlDto: ControlDto) {
    const status = await this.dashboardService.controlDevice(controlDto);
    return status;
  }
}
