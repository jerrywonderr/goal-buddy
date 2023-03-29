import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CreateGroupDto } from './dto/creategroup.dto';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {

  constructor(private readonly groupService: GroupService) {}

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

  @Get('/:name')
  getAllTasks(@Param('name') name: string) {
    /**
     * Get all tasks in a group identified with name
     */

    console.log(name);

    return [];
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
    return await this.groupService.create(createDto, username);
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
