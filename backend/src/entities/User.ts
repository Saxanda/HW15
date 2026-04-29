import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm';
import { Newspost } from './NewsPost';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Index()
    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ default: false })
    deleted!: boolean;

    @OneToMany(() => Newspost, (post) => post.author)
    newsposts!: Newspost[];
}