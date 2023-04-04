import { IsNotEmpty, IsNotEmptyObject, IsNumber, IsString } from "class-validator";
import { UserEntity } from "src/config/db/entities/user.entity";

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  task_perm: number;

  @IsNotEmpty()
  @IsNumber()
  group_perm: number
}
