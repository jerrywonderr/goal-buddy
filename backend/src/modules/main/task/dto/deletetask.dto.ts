import { IsNotEmpty, IsUUID } from "class-validator";

class DeleteTaskDto {
	@IsNotEmpty()
	@IsUUID()
	taskId: string;
}

export default DeleteTaskDto;