import { Injectable } from '@nestjs/common';
import { GroupMemberEntity } from 'src/entities/groupmember.entity';
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

  async leaveGroup(username: string, groupname: string) {
    console.log(username);
    console.log(groupname);
    let uname = username;
    let gname = groupname;
    console.log(uname, gname)
    const resp = await this.groupMemberRepository.find({
      where: {
        // role: UserRole.moderator
        user: {
          username: uname
        },
        group: {
          name: gname
        }
        // user: {
        //   username,
        // },
        // group: {
        //   name: groupname,
        },
        relations: ['user', 'group']
      // },
    });
    console.log(resp);
    // await this.groupMemberRepository
    //   .createQueryBuilder()
    //   .delete()
    //   .from(GroupMemberEntity)
    //   .where('user.username = :username', { username })
    //   .andWhere('group.name = :groupname', { groupname })
    //   .execute();

    // return true;
  }
}
