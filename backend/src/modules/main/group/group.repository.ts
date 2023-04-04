import { Injectable } from "@nestjs/common";
import { GroupEntity } from "src/config/db/entities/group.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
class GroupRepository extends Repository<GroupEntity> {
    constructor(private dataSource: DataSource) {
        super(GroupEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
    }

    async getAll(username: string) {
        /**
         * Get all groups where the user identified by username belongs
         */
        return this.find();
    }
}

export default GroupRepository;
