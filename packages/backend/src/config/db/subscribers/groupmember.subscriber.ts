import {
  EntitySubscriberInterface,
  EventSubscriber,
  RemoveEvent,
} from 'typeorm';
import { GroupMemberEntity } from '../entities/groupmember.entity';
import { TaskEntity } from '../entities/task.entity';

@EventSubscriber()
class GroupMemberSubscriber
  implements EntitySubscriberInterface<GroupMemberEntity>
{
  listenTo(): string | Function {
    return GroupMemberEntity;
  }
  async beforeRemove(event: RemoveEvent<GroupMemberEntity>): Promise<any> {}
}

export default GroupMemberSubscriber;
