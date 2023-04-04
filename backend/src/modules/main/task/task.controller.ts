import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotAcceptableException,
  Param,
  Post,
} from '@nestjs/common';
import { MainService } from '../main.service';
import CreateTaskDto from './dto/createtask.dto';
import { TaskService } from './task.service';
import DeleteTaskDto from './dto/deletetask.dto';

@Controller('task')
export class TaskController {
  constructor(
    private readonly mainService: MainService,
    private readonly taskService: TaskService,
  ) {}

  /**
   * Creates a new task
   *
   * @param createDto the body of the request
   * @returns the newly created task
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateTaskDto) {
    const username = 'wonderr1';
    const task = await this.mainService.setUpTask(createDto, username);
    if (!task)
      throw new NotAcceptableException('An error occured, try again.', {
        cause: new Error('Possibly user do not belong to the provided group'),
      });
    return task;
  }

  /**
   * Gets all task attached to the current user
   *
   * @returns {TaskEntity[]}
   */
  @Get()
  async getTasks() {
    const username = 'wonderr1';
    return await this.taskService.getTasksByUserName(username);
  }

  /**
   * deletes a task
   */
  @Delete(':taskId')
  async delete(@Param() { taskId }: DeleteTaskDto) {
    const username = 'wonderr1';
    const deleteStatus = await this.taskService.delete(taskId, username);
    if (!deleteStatus) throw new BadRequestException('Error, try again!');
    return {
      message: 'success'
    };
  }
}
