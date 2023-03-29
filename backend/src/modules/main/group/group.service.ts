import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { CreateGroupDto } from './dto/creategroup.dto';
import GroupRepository from './group.repository';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

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
}
