import { UserRole } from "src/helpers/enums";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group.entity";
import { User } from "./user.entity";

@Entity()
export class GroupMember {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Group, (group) => group.members)
    group: Group;

    @ManyToOne(() => User)
    user: User;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.regular
    })
    role: UserRole;
}