import { IsNotEmpty, IsUUID } from 'class-validator';

class MarkAsDoneDto {
  @IsNotEmpty()
  @IsUUID()
  taskId: string;
}

export default MarkAsDoneDto;
