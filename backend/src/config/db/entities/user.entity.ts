import { hashPassword } from 'src/helpers/auth.helpers';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupEntity } from './group.entity';
import { GroupMemberEntity } from './groupmember.entity';
import { TaskEntity } from './task.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 200,
  })
  email: string;

  @Column('varchar', {
    length: 200,
  })
  username: string;

  @Column('varchar', {
    length: 200,
  })
  password: string;

  @OneToMany(() => GroupMemberEntity, (groupMember) => groupMember.user)
  groups: GroupMemberEntity[];

  @OneToMany(() => GroupEntity, (group) => group.creator)
  createdGroups: GroupEntity[];

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];

  @CreateDateColumn()
  joined: Date;

  @BeforeInsert()
  async hashPasswordBeforeSave() {
    this.password = await hashPassword(this.password);
  }
}
