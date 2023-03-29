import { Injectable } from '@nestjs/common';
import CreateUserDto from './dto/createuser.dto';
import UserRepository from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Create a user account
   *
   * @param {string} username - the new user username
   * @param {string} email - the new user email
   * @param {string} password - the new user password
   * @returns the newly created user object
   */

  async create({ username, email, password }: CreateUserDto) {
    const user = this.userRepository.create({
      username,
      password,
      email,
    });

    await this.userRepository.save(user);
    return user;
  }

  /**
   * Gets a user whose name equals username, and groups that user belongs to
   *
   * @param {string} username - the user's username
   * @returns the user if found else null
   */
  async get(username: string) {
    return await this.userRepository.findOne({
      where: { username: username },
      relations: ['groups', 'groups.group']
    });
  }
}
