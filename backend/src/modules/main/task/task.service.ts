import { Inject, Injectable } from '@nestjs/common';
import { GroupEntity } from 'src/config/db/entities/group.entity';
import { UserEntity } from 'src/config/db/entities/user.entity';
import { IGetTask } from 'src/helpers/interfaces/gettask.interface';
import CreateTaskDto from './dto/createtask.dto';
import TaskRepository from './task.repository';
import { GroupMemberEntity } from 'src/config/db/entities/groupmember.entity';
import UpdateTaskRequestDto from './dto/updatetaskrequest.dto';
import { TaskEntity } from 'src/config/db/entities/task.entity';

@Injectable()
export class TaskService {
  @Inject(TaskRepository)
  private readonly taskRepository: TaskRepository;

  /**
   * Returns the task identified by id
   * @param id The id of the task to be fetched
   * @returns {Promise<TaskIdentity|null>}
   */
  async get(id: string) {
    return await this.taskRepository.findOneBy({ id });
  }

  /**
   * Create a new task
   * @param createDto the params needed to create the task
   * @returns {Promise<TaskEntity} a promise that resolves to the newly created task
   */
  async create(
    createDto: CreateTaskDto,
    group: GroupEntity,
    groupMember: GroupMemberEntity,
    user: UserEntity,
  ) {
    const { title, notes, deadline } = createDto;
    const task = this.taskRepository.create({
      notes: notes || '',
      title,
      deadline,
      group,
      groupMember,
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

    tasks.forEach((value) => {
      const newValue: IGetTask = { ...value, username };
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
        user: true,
      },
    });

    const response: IGetTask[] = [];

    tasks.forEach((value) => {
      const newValue: IGetTask = { ...value, username: value.user.username };
      delete newValue.user;
      response.push(newValue);
    });

    return response;
  }

  /**
   * Deletes a task
   *
   * @param {string} taskId the id of the task to be deleted
   * @param {string} username the username of the user that created the task
   * @returns {boolean}
   */
  async delete(taskId: string, username: string) {
    const task = await this.taskRepository.findOneBy({
      user: {
        username,
      },
      id: taskId,
    });
    if (!task) return false;
    await this.taskRepository.remove(task);
    return true;
  }

  /**
   * Checks if a task exists
   *
   * @param taskId the id of the task to be checked
   * @param username the username of the user that created the task
   * @returns {boolean}
   */
  async exists(taskId: string, username: string) {
    return await this.taskRepository.exist({
      where: {
        user: { username },
        id: taskId,
      },
    });
  }

  /**
   * Updates a task
   *
   * @param taskId the is of the task to be updated
   * @param param1 an object {title: string, notes: string},
   *               where title is the title of the task and
   *               notes are extra notes attached to the task
   * @returns {boolean}
   */
  async updateInfo(
    taskId: string,
    username: string,
    { title, notes }: UpdateTaskRequestDto,
  ) {
    if (!title && !notes) throw Error('Nothing to update.');
    const taskExist = await this.exists(taskId, username);
    if (!taskExist) throw Error("Task doesn't exist");
    const updateObject: UpdateTaskRequestDto = {};
    if (title) Object.assign(updateObject, { title });
    if (notes) Object.assign(updateObject, { notes });
    const status = await this.update(taskId, updateObject);
    if (!status) throw Error('Failed to update task');
    return await this.get(taskId);
  }

  /**
   * Updates a task with props in updateObject
   *
   * @param taskId the id of the task to be updated
   * @param updateObject object containing properies to be updated
   * @returns {boolean}
   */
  async update(taskId: string, updateObject: Partial<TaskEntity>) {
    const resp = await this.taskRepository.update(taskId, updateObject);
    return Boolean(resp.affected);
  }

  /**
   * Marks the task as completed (done)
   *
   * @param taskId the id of the task to be marked as done
   * @param username the username of the user that created the task
   * @returns {boolean}
   */
  async markAsDone(taskId: string, username: string) {
    const taskExist = await this.exists(taskId, username);
    if (!taskExist) throw Error("Task doesn't exist");
    const status = await this.update(taskId, { done: true });
    if (!status) throw Error('Failed to mark task as done');
    return await this.get(taskId);
  }
}
