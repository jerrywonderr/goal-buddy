import { GroupEntity } from "src/config/db/entities/group.entity";
import { UserEntity } from "src/config/db/entities/user.entity";
import { UserRole } from "src/helpers/enums";

class CreateGroupMemberDto {
  group: GroupEntity;
  role: UserRole;
  user: UserEntity;
}

export default CreateGroupMemberDto;