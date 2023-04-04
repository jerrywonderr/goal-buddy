import { Injectable } from '@nestjs/common';
import { TaskEntity } from 'src/config/db/entities/task.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
class TaskRepository extends Repository<TaskEntity> {
  constructor(private dataSource: DataSource) {
    super(
      TaskEntity,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }
}

export default TaskRepository;