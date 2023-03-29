import { IsDateString, IsNotEmpty, IsString } from "class-validator";

class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  notes?: string;

  @IsDateString()
  @IsNotEmpty()
  deadline: Date;

  @IsString()
  @IsNotEmpty()
  group: string;
}

export default CreateTaskDto;