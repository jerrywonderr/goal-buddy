import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

class UpdateTaskRequestDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  notes?: string;
}

export default UpdateTaskRequestDto;
