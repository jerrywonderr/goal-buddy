import { TaskEntity } from "src/config/db/entities/task.entity";

export interface IGetTask extends Partial<TaskEntity> {
  username: string
}