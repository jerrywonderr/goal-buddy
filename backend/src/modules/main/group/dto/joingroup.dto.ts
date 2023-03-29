import { IsNotEmpty, IsString } from "class-validator";

class JoinGroupDto {
  @IsString()
  @IsNotEmpty()
  groupname: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}

export default JoinGroupDto;