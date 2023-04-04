import { IsNotEmpty, IsUUID } from "class-validator";

class TaskDto {
	@IsNotEmpty()
	@IsUUID()
	taskId: string;
}

export default TaskDto;