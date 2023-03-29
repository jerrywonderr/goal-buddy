import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('group')
export class GroupController {

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

    return []
  }

  @Patch('/:name')
  updateGroup(@Param('name') name: string) {
    /**
     * Update group identified with name
     */

    console.log(name);

    return []
  }

  @Post('join')
  joinGroup() {
    /**
     * Add user to a group
     */

    return [];
  }

  @Post('create')
  createGroup() {
    /**
     * Create a group
     */

    return [];
  }

  @Post('remove')
  leaveGroup() {
    /**
     * Remove user from group identified with name
     */

    console.log(name);

    return []
  }

}
