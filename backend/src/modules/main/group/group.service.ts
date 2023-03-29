import { Injectable } from '@nestjs/common';
import GroupRepository from './group.repository';

@Injectable()
export class GroupService {

    constructor(private readonly groupRepository: GroupRepository) {}

    getAllGroups = async () => {
        return await this.groupRepository.getAll('');
    }
}
