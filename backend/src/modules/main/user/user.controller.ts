import { Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Post } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { UserNotFound } from 'src/exceptions/base.exceptions';
import { EntityNotFoundError } from 'typeorm';
import CreateUserDto from './dto/createuser.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Create a user account
   */
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateUserDto) {
    return await this.userService.create(createDto);
  }

  /**
   * Return currently authenticated user i.e user in session if it exists
   */
  @Get('/user')
  async get() {
    const username = 'wonder1';
    const user = await this.userService.get(username);
    if (!user) throw new UserNotFound(username);
    return user;
  }
}
