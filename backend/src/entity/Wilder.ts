import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Grade } from './Grade';

@Entity()
export class Wilder {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    city: string;

    @Column({nullable: true})
    avatar: string;

    @Column({nullable: true})
    description: string;

    @OneToMany(() => Grade, (grade: Grade) => grade.wilder)
    grades: Grade[]
}