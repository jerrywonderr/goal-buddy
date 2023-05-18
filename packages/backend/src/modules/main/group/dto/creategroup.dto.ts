import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  task_perm: number;

  @IsNotEmpty()
  @IsNumber()
  group_perm: number;
}
