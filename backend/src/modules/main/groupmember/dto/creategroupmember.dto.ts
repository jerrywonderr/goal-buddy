import { GroupEntity } from "src/entities/group.entity";
import { UserEntity } from "src/entities/user.entity";
import { UserRole } from "src/helpers/enums";

class CreateGroupMemberDto {
  group: GroupEntity;
  role: UserRole;
  user: UserEntity;
}

export default CreateGroupMemberDto;