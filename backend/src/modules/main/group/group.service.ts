import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { UserRole } from 'src/helpers/enums';
import { GroupMemberService } from '../groupmember/groupmember.service';
import { UserService } from '../user/user.service';
import { CreateGroupDto } from './dto/creategroup.dto';
import GroupRepository from './group.repository';

@Injectable()
export class GroupService {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly userService: UserService,
    private readonly groupMemberService: GroupMemberService
  ) {}

  async getAllGroups() {
    return await this.groupRepository.getAll('');
  }

  /**
   * Create a new group
   *
   * @param createParams - the parameters to be used to create the group
   * @returns the newly created group
   */
  async create(createParams: CreateGroupDto, creator: UserEntity) {
    const { name, task_perm, group_perm } = createParams;
    const group = this.groupRepository.create({
      name,
      creator,
      task_perm,
      group_perm,
    });
    await this.groupRepository.save(group);
    return group;
  }

  /**
   * Get the group identified with name
   *
   * @param {string} name the name of the group to be found
   * @returns the group if found else null
   */
  async get(name: string) {
    return await this.groupRepository.findOne({
      where: { name },
    });
  }

  /**
   * Adds a user to group
   * 
   * @param username the username of user to add to group
   * @param groupname the name of the group user is to be added
   * @returns an object on success
   */
  async addToGroup(username: string, groupname: string) {
    const userInGroup = await this.groupMemberService.isUserInGroup(username, groupname); 
    if (userInGroup) return {
      message: 'User is already in group'
    }

    const user = await this.userService.get(username);
    const group = await this.groupRepository.findOneBy({name: groupname});
    if (!group || !user) throw Error;
  
    await this.groupMemberService.create({group, user, role: UserRole.regular});
    return {
      message: 'User added successfully'
    }
  }

  /**
   * Checks if username is the creator of the group
   * 
   * @param username the username of user
   * @param groupname the group name
   * @returns {Promise<boolean>}
   */
  async userIsGroupCreator(username: string, groupname: string) {
    return await this.groupRepository.exist({
      where: {
        creator: {
          username
        },
        name: groupname
      }
    });
  }
}
