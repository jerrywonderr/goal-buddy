import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotAcceptableException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import IsModerator from 'src/helpers/gaurds/moderator.gaurd';
import { GroupMemberService } from '../groupmember/groupmember.service';
import { MainService } from '../main.service';
import { TaskService } from '../task/task.service';
import { UserService } from '../user/user.service';
import { CreateGroupDto } from './dto/creategroup.dto';
import JoinOrLeaveGroupDto from './dto/joinorleavegroup.dto';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly mainService: MainService,
    private readonly taskService: TaskService,
    private readonly userService: UserService,
    private readonly groupMemberService: GroupMemberService,
  ) {}

  /**
   * Get all groups attached to a user
   */
  @Get()
  async getUserGroups() {
    const username = 'wonderr1';
    const user = await this.userService.get(username);
    if (!user) throw new ForbiddenException('No current session');
    const response = {
      username: user.username,
      email: user.email,
      groups: user.groups.map((value) => value.group)
    }
    return response;
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

  /**
   * Add user to a group
   */
  @UseGuards(IsModerator)
  @Post('join')
  async joinGroup(@Body() { username, groupname }: JoinOrLeaveGroupDto) {
    try {
      return await this.groupService.addToGroup(username, groupname);
    } catch {
      throw new NotAcceptableException('An error occured, confirm group name');
    }
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

  /**
   * Remove user from group identified with name
   */
  @UseGuards(IsModerator)
  @Post('remove')
  leaveGroup(@Body() { groupname, username }: JoinOrLeaveGroupDto) {
    try {
      const resp = this.mainService.leaveGroup(groupname, username);
      return resp;
    } catch (err: any) {
      throw new ForbiddenException(err.message);
    }
  }
}
