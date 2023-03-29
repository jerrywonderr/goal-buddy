import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotAcceptableException,
  Post,
} from '@nestjs/common';
import { MainService } from '../main.service';
import CreateTaskDto from './dto/createtask.dto';
import { TaskService } from './task.service';

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
    const username = 'wonder1';
    const task = await this.mainService.setUpTask(createDto, username);
    if (!task) throw new NotAcceptableException('An error occured, try again.',{
      cause: new Error("Possibly the provided group does not exist")
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
    const username = 'wonder1';
    return await this.taskService.getTasksByUserName(username);
  }
}
