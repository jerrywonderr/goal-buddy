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

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity, UserEntity])],
  providers: [GroupService, GroupRepository, UserRepository, UserService],
  controllers: [GroupController, UserController]
})
export class MainModule {}
