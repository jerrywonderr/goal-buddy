import { IsNotEmpty, IsString } from "class-validator";

class JoinOrLeaveGroupDto {
  @IsString()
  @IsNotEmpty()
  groupname: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}

export default JoinOrLeaveGroupDto;