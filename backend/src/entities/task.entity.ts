import {
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

@Entity("task")
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 200,
  })
  title: string;

  @Column('boolean')
  done: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column('date')
  deadline: Date;

  @Column('text')
  notes: string;

  @ManyToOne(() => GroupEntity, (group) => group.tasks)
  group: GroupEntity;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: UserEntity;
}
