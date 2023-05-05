import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import { Skill } from './Skill';
import { Wilder } from './Wilder';

@Entity()
export class Grade {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    grade: number;

    @ManyToOne(() => Skill, (skill) => skill.id, { eager: true })
    skill: Skill

    @ManyToOne(() => Wilder, (wilder) => wilder.grades, { eager: true })
    wilder: Wilder
}