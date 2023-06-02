import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import { Skill } from './Skill';
import { Wilder } from './Wilder';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
export class Grade {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    grade: number;

    @Field(type => Skill)
    @ManyToOne(() => Skill, (skill) => skill.id, { eager: true })
    skill: Skill

    @Field(type => Wilder)
    @ManyToOne(() => Wilder, (wilder) => wilder.grades, { eager: true })
    wilder: Wilder
}