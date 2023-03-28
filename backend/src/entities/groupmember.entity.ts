import { UserRole } from "src/helpers/enums";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "./group.entity";
import { UserEntity } from "./user.entity";

@Entity("group_member")
export class GroupMemberEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => GroupEntity, (group) => group.members)
    group: GroupEntity;

    @ManyToOne(() => UserEntity)
    user: UserEntity;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.regular
    })
    role: UserRole;
}