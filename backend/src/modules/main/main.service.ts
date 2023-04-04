import { Injectable, NotAcceptableException, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { UserRole } from 'src/helpers/enums';
import { EntityNotFoundError } from 'typeorm';
import { CreateGroupDto } from './group/dto/creategroup.dto';
import { GroupService } from './group/group.service';
import { GroupMemberService } from './groupmember/groupmember.service';
import CreateTaskDto from './task/dto/createtask.dto';
import { TaskService } from './task/task.service';
import { UserService } from './user/user.service';

@Injectable()
export class MainService {
  constructor(
    private readonly userService: UserService,
    private readonly groupService: GroupService,
    private readonly groupMemberService: GroupMemberService,
    private readonly taskService: TaskService
  ) {}

  /**
   * Sets up a group i.e creates the group and also create group config for the creator of the group
   * 
   * @param createParams the necessary params needed tp create the group
   * @param username the username of the user that is creating the group
   * @returns {Promise<GroupEntity>}
   */
  async setUpGroup(createParams: CreateGroupDto, username: string) {
    const { name, task_perm, group_perm } = createParams;
    const creator = await this.userService.get(username); // Fetch user with that username
    if (!creator) throw EntityNotFoundError;
    // Create the group
    const group = await this.groupService.create(
      {
        name,
        task_perm,
        group_perm,
      },
      creator,
    );
    // Create the user config for the group
    await this.groupMemberService.create({
      group,
      role: UserRole.moderator,
      user: group.creator,
    });
    return {...group, creator: group.creator.username};
  }

  /**
   * sets up a task, simply creates a task
   * 
   * @param createTaskConfig the parameters needed to create the task
   * @param username the username of user creating task
   * @returns {Promise<TaskEntity>}
   */
  async setUpTask(createTaskConfig: CreateTaskDto, username: string) {
    const { group: groupName } = createTaskConfig;
    const user = await this.userService.get(username);
    const group = user?.groups.find(group => group.group.name === groupName);
    if (!user || !group) return null;
    const task = await this.taskService.create(createTaskConfig, group.group, group, user);
    return task;
  }

  async leaveGroup(groupname: string, username: string) {

    const isCreator = await this.groupService.userIsGroupCreator(username, groupname);

    if (isCreator) throw new Error("Error! Cannot remove group creator.");

    const status = await this.groupMemberService.leaveGroup(groupname, username);
    if (!status) return false;
    return true;
  }
}
 