import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GroupMemberEntity } from './groupmember.entity';
import { TaskEntity } from './task.entity';
import { UserEntity } from './user.entity';

@Entity('group')
export class GroupEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 200,
  })
  name: string;

  @Column('int')
  task_perm: number;

  @Column('int')
  group_perm: number;

  @ManyToOne(() => UserEntity, (user) => user.createdGroups)
  creator: UserEntity;

  @OneToMany(() => GroupMemberEntity, (groupMember) => groupMember.group)
  members: GroupMemberEntity[];

  @OneToMany(() => TaskEntity, (task) => task.group)
  tasks: TaskEntity[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
