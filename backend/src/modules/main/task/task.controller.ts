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
  Put,
} from '@nestjs/common';
import { MainService } from '../main.service';
import CreateTaskDto from './dto/createtask.dto';
import { TaskService } from './task.service';
import TaskDto from './dto/task.dto';
import UpdateTaskDto from './dto/updatetaskrequest.dto';
import MarkAsDoneDto from './dto/markasdone.dto';

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
  async delete(@Param() { taskId }: TaskDto) {
    const username = 'wonderr1';
    const deleteStatus = await this.taskService.delete(taskId, username);
    if (!deleteStatus) throw new BadRequestException('Error, try again!');
    return {
      message: 'success',
    };
  }

  /**
   * Updates a task's title and notes
   */
  @Put(':taskId')
  async update(
    @Param() { taskId }: TaskDto,
    @Body() { title, notes }: UpdateTaskDto,
  ) {
    try {
      const username = 'wonderr1';
      const updatedTask = await this.taskService.updateInfo(taskId, username, { title, notes });
      return updatedTask
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('complete')
  async markAsDone(@Body() { taskId }: MarkAsDoneDto) {
    try {
      const username = 'wonderr1';
      const updatedTask = await this.taskService.markAsDone(taskId, username);
      return updatedTask;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
