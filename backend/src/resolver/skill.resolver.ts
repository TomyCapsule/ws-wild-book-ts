import { Resolver, Query, Arg, Mutation } from 'type-graphql'
import { Skill } from '../entity/Skill';
import dataSource from '../utils';

@Resolver(Skill)
export class SkillResolver{
    @Query(returns => [Skill])
    async getAllSkills(): Promise<Skill[]>{
        const allSkills = await dataSource.manager.find(Skill);
        return allSkills;
    }

    @Mutation(returns => Skill)
    async addSkill(
        @Arg("name") name: string
    ) : Promise<Skill> {
        const newSkill = await dataSource.manager.save(Skill, {name});
        return newSkill;
    }
}