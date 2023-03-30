import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group.entity";
import { User } from "./user.entity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar", {
        length: 200
    })
    title: string;

    @Column("boolean")
    done: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @Column("date")
    deadline: Date;

    @Column("text")
    notes: string;

    @ManyToOne(() => Group, (group) => group.tasks)
    group: Group;

    @ManyToOne(() => User, (user) => user.tasks)
    user: User;
}