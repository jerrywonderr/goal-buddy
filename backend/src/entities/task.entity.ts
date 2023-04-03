import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupEntity } from './group.entity';
import { UserEntity } from './user.entity';
import { GroupMemberEntity } from './groupmember.entity';

@Entity("task")
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 200,
  })
  title: string;

  @Column('boolean', {default: false})
  done: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column('date')
  deadline: Date;

  @Column('text')
  notes: string;

  @ManyToOne(() => GroupEntity, (group) => group.tasks)
  group: GroupEntity;

  @ManyToOne(() => GroupMemberEntity, (groupMember) => groupMember.tasks)
  groupMember: GroupMemberEntity;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: UserEntity;
}
