import { UserRole } from 'src/helpers/enums';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupEntity } from './group.entity';
import { UserEntity } from './user.entity';
import { TaskEntity } from './task.entity';

@Entity('group_member')
export class GroupMemberEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => GroupEntity, (group) => group.members)
  group: GroupEntity;

  @ManyToOne(() => UserEntity, (user) => user.groups)
  user: UserEntity;

  @OneToMany(() => TaskEntity, (tasks) => tasks.groupMember)
  tasks: TaskEntity[];

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.regular,
  })
  role: UserRole;
}
