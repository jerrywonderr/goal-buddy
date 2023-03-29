import { Injectable } from '@nestjs/common';
import { GroupEntity } from 'src/entities/group.entity';
import { UserEntity } from 'src/entities/user.entity';
import { IGetTask } from 'src/helpers/interfaces/gettask.interface';
import CreateTaskDto from './dto/createtask.dto';
import TaskRepository from './task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  /**
   * Create a new task
   * @param createDto the params needed to create the task
   * @returns {Promise<TaskEntity} a promise that resolves to the newly created task
   */
  async create(createDto: CreateTaskDto, group: GroupEntity, user: UserEntity) {
    const { title, notes, deadline } = createDto;
    const task = this.taskRepository.create({
      notes: notes || '',
      title,
      deadline,
      group,
    });
    task.user = user;
    await this.taskRepository.save(task);
    return { ...task, group: task.group.name, user: task.user.username };
  }

  /**
   * Gets all tasks created by user
   *
   * @param {string} username the username of user
   * @returns a promise of array of tasks created by user
   */
  async getTasksByUserName(username: string) {
    const tasks = await this.taskRepository.find({
      where: {
        user: { username },
      },
    });

    const response: IGetTask[] = [];

    tasks.forEach(value => {
      const newValue: IGetTask = {...value, username};
      response.push(newValue);
    });

    return response;
  }

  /**
   * Gets all tasks attached to a group
   *
   * @param {string} groupname the name of the group
   * @returns a promise of array of tasks attached to group
   */
  async getTasksByGroup(groupname: string) {
    const tasks = await this.taskRepository.find({
      where: {
        group: { name: groupname },
      },
      relations: {
        user: true
      },
    });

    const response: IGetTask[] = [];

    tasks.forEach(value => {
      const newValue: IGetTask = {...value, username: value.user.username};
      delete newValue.user;
      response.push(newValue);
    });

    return response;
  }
}
