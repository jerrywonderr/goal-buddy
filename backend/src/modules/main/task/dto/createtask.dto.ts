import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsDateString()
  @IsNotEmpty()
  deadline: Date;

  @IsString()
  @IsNotEmpty()
  group: string;
}

export default CreateTaskDto;