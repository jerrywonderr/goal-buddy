import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MainService } from '../main.service';
import { TaskService } from '../task/task.service';
import { CreateGroupDto } from './dto/creategroup.dto';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly mainService: MainService,
    private readonly taskService: TaskService
  ) {}

  @Get()
  getAll() {
    /**
     * Get all groups attached to a user
     */

    return [];
  }

  @Delete()
  deleteGroup() {
    /**
     * Delete a group
     */

    return [];
  }

  /**
   * Get all tasks in a group identified with name
   */
  @Get('/:name')
  async getAllTasks(@Param('name') groupName: string) {
    return await this.taskService.getTasksByGroup(groupName);
  }

  @Patch('/:name')
  updateGroup(@Param('name') name: string) {
    /**
     * Update group identified with name
     */

    console.log(name);

    return [];
  }

  @Post('join')
  joinGroup() {
    /**
     * Add user to a group
     */

    return [];
  }

  /**
   * Create a group
   */
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createGroup(@Body() createDto: CreateGroupDto) {
    const username = 'wonder1';
    return await this.mainService.setUpGroup(createDto, username);
  }

  @Post('remove')
  leaveGroup() {
    /**
     * Remove user from group identified with name
     */

    console.log(name);

    return [];
  }
}
