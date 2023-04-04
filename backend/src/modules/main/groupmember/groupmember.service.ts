import { Injectable } from '@nestjs/common';
import { GroupMemberEntity } from 'src/config/db/entities/groupmember.entity';
import CreateGroupMemberDto from './dto/creategroupmember.dto';
import GroupMemberRepository from './groupmember.repository';
import { UserRole } from 'src/helpers/enums';

@Injectable()
export class GroupMemberService {
  constructor(private readonly groupMemberRepository: GroupMemberRepository) {}

  /**
   * Create user config for a group
   * @param createGroupOptions - parameters needed to create the groupmember config
   */
  async create(createGroupOptions: CreateGroupMemberDto) {
    const { group, role, user } = createGroupOptions;
    const groupConfig = this.groupMemberRepository.create({
      role,
      group,
      user,
    });

    await this.groupMemberRepository.save(groupConfig);
  }

  /**
   * Checks if user is in a group
   * @param username the username of the user
   * @param groupname the name of the group
   * @returns {boolean}
   */
  async isUserInGroup(username: string, groupname: string) {
    return await this.groupMemberRepository.exist({
      where: {
        user: {
          username,
        },
        group: {
          name: groupname,
        },
      },
    });
  }

  /**
   * Removes a user from a group, simply deletes the user data from the groupMember table
   * 
   * @param {string} groupname the name of the group user is to be removed from
   * @param {username} username the user's username
   * @returns {boolean}
   */
  async leaveGroup(groupname: string, username: string) {
    const groupConfig = await this.groupMemberRepository.findOne({
      where: {
        user: {
          username: username,
        },
        group: {
          name: groupname,
        },
      }
    });
    if (!groupConfig) return false;
    await this.groupMemberRepository.remove(groupConfig);
    return true;
  }
}
