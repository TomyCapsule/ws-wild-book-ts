import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Grade } from './Grade';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
export class Wilder {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field({nullable: true})
    @Column({nullable: true})
    city: string;

    @Field({nullable: true})
    @Column({nullable: true})
    avatar: string;

    @Field({nullable: true})
    @Column({nullable: true})
    description: string;

    @Field(type => [Grade])
    @OneToMany(() => Grade, (grade: Grade) => grade.wilder)
    grades: Grade[]
}