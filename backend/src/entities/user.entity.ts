import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group.entity";
import { GroupMember } from "./groupmember.entity";
import { Task } from "./task.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar", {
        length: 200
    })
    email: string;

    @Column("varchar", {
        length: 200
    })
    username: string;

    @Column("varchar", {
        length: 200
    })
    password: string;

    @OneToMany(() => GroupMember, (groupMember) => groupMember.user)
    groups: GroupMember[]

    @OneToMany(() => Group, (group) => group.creator)
    createdGroups: Group[]

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[]

    @CreateDateColumn()
    joined: Date;
}