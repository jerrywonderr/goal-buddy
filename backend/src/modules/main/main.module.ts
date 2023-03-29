import { Module } from '@nestjs/common';
import { GroupService } from './group/group.service';
import { GroupController } from './group/group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from 'src/entities/group.entity';
import { UserController } from './user/user.controller';
import GroupRepository from './group/group.repository';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from './user/user.service';
import UserRepository from './user/user.repository';
import { GroupMemberEntity } from 'src/entities/groupmember.entity';
import { GroupmemberService } from './groupmember/groupmember.service';
import { MainService } from './main.service';
import { TaskService } from './task/task.service';
import { TaskController } from './task/task.controller';
import GroupMemberRepository from './groupmember/groupmember.repository';
import { TaskEntity } from 'src/entities/task.entity';
import TaskRepository from './task/task.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupEntity, UserEntity, GroupMemberEntity, TaskEntity]),
  ],
  providers: [
    GroupService,
    GroupRepository,
    UserRepository,
    UserService,
    GroupMemberRepository,
    GroupmemberService,
    MainService,
    TaskService,
    TaskRepository,
  ],
  controllers: [GroupController, UserController, TaskController],
})
export class MainModule {}
