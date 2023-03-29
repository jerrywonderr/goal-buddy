import { Injectable } from '@nestjs/common';
import { UserRole } from 'src/helpers/enums';
import { EntityNotFoundError } from 'typeorm';
import { CreateGroupDto } from './group/dto/creategroup.dto';
import { GroupService } from './group/group.service';
import { GroupmemberService } from './groupmember/groupmember.service';
import { UserService } from './user/user.service';

@Injectable()
export class MainService {
  constructor(
    private readonly userService: UserService,
    private readonly groupService: GroupService,
    private readonly groupMemberService: GroupmemberService,
  ) {}

  /**
   * Sets up a group i.e creates the group and also create group config for the creator of the group
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
}
