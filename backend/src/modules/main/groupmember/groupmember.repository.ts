import { Injectable } from '@nestjs/common';
import { GroupMemberEntity } from 'src/entities/groupmember.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
class GroupMemberRepository extends Repository<GroupMemberEntity> {
  constructor(private dataSource: DataSource) {
    super(
      GroupMemberEntity,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }
}

export default GroupMemberRepository;