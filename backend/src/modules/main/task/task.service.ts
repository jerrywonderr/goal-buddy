import { Injectable } from '@nestjs/common';
import { GroupEntity } from 'src/entities/group.entity';
import { TaskEntity } from 'src/entities/task.entity';
import { UserEntity } from 'src/entities/user.entity';
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
      notes,
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
    const tasks = await this.taskRepository.findBy({
      user: { username },
    });

    return tasks;
  }
}
