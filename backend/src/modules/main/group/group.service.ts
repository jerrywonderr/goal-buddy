import { Injectable } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateGroupDto } from './dto/creategroup.dto';
import GroupRepository from './group.repository';

@Injectable()
export class GroupService {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly userService: UserService,
  ) {}

  async getAllGroups() {
    return await this.groupRepository.getAll('');
  }

  /**
   * Create a new group
   * @param createParams - the parameters to be used to create the group
   * @returns the newly created group
   */
  async create(createParams: CreateGroupDto, username: string) {
    const { name, task_perm, group_perm } = createParams;
    const creator = await this.userService.get(username); // Fetch user with that username
    if (!creator) throw EntityNotFoundError;
    const group = this.groupRepository.create({
      name,
      creator,
      task_perm,
      group_perm,
    });
    await this.groupRepository.save(group);
    return group;
  }
}
