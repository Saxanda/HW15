import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    Index,
} from 'typeorm';
import { User } from './User';

@Entity({ name: 'posts' })
export class Newspost {
    @PrimaryGeneratedColumn()
    id!: number;

    @Index()
    @Column()
    header!: string;

    @Column()
    text!: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createDate!: Date;

    @Column({ default: false })
    deleted!: boolean;

    @Index()
    @ManyToOne(() => User, (user) => user.newsposts, { nullable: false })
    author!: User;
}