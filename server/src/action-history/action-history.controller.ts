/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
import { ActionHistoryService } from './action-history.service';
import { CreateActionHistoryDto } from './dto/create-action-history.dto';
import { UpdateActionHistoryDto } from './dto/update-action-history.dto';
import { ActionHistory } from './entities/action-history.entity';

@Controller('action-history')
@ApiTags('Action History')
export class ActionHistoryController {
  constructor(private readonly actionHistoryService: ActionHistoryService) {}

  // create action
  @Post()
  @ApiOperation({ summary: 'Create a new action' })
  @ApiCreatedResponse({
    description: 'Action history has been created successfully',
    type: ActionHistory,
  })
  create(@Body() createActionHistoryDto: CreateActionHistoryDto) {
    return this.actionHistoryService.create(createActionHistoryDto);
  }

  // find all actions
  @Get()
  @ApiOperation({ summary: 'Find all actions' })
  @ApiResponse({
    status: 200,
    description: 'Get all action history',
    type: [ActionHistory],
  })
  findAll() {
    return this.actionHistoryService.findAll();
  }

  // find action by ID
  // @ApiOperation({ summary: 'Find an action via ID' })
  // @Get(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: 'number',
  //   description: 'Action ID',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Get action history successfully',
  // type: ActionHistory,
  // })
  // findOne(@Param('id') id: string) {
  //   return this.actionHistoryService.findOne(Number(id));
  // }

  // update action by ID
  @Patch(':id')
  @ApiOperation({ summary: 'Update action history via ID' })
  @ApiParam({ name: 'id', description: 'Action history ID' })
  @ApiBody({ type: UpdateActionHistoryDto })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated',
    type: ActionHistory,
  })
  update(
    @Param('id') id: string,
    @Body() updateActionHistoryDto: UpdateActionHistoryDto,
  ) {
    return this.actionHistoryService.update(Number(id), updateActionHistoryDto);
  }

  // delete action history by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete action history via ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted',
  })
  remove(@Param('id') id: string) {
    return this.actionHistoryService.remove(Number(id));
  }
}
