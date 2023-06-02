import { Resolver, Query, Arg, Mutation } from 'type-graphql'
import { Grade } from '../entity/Grade';
import dataSource from '../utils';
import { Skill } from '../entity/Skill';
import { Wilder } from '../entity/Wilder';
// import { Wilder } from '../entity/Wilder';

@Resolver(Grade)
export class GradeResolver {
    @Query(returns => [Grade])
    async getAllGrades(): Promise<Grade[]> {
        const allGrades = await dataSource.manager.find(Grade, {
            relations: {
                skill: true            }
        });
        return allGrades;
    }

    @Mutation(returns => Boolean)
    async createGrade(
        @Arg("grade") grade: number,
        @Arg("wilderId") wilderId: number,
        @Arg("skill") skill: string
    ) : Promise<Boolean> {
        const skillToGrade = await dataSource.getRepository(Skill).findOne({
            where: {
                name: skill
            }
        });
        const wilderToGrade = await dataSource.getRepository(Wilder).findOne({
            where:{
                id: wilderId
            }
        })
        if(skillToGrade !== null && wilderToGrade !== null){
            await dataSource.manager.save(Grade, {
                grade,
                skill: skillToGrade,
                wilder: wilderToGrade
            });
            return true;
        }
        return false;
    }

    @Mutation(returns => Boolean)
    async deleteGrade(
        @Arg("skill") skill: string,
        @Arg("wilderId") wilderId: number
    ) : Promise<Boolean> {
        const wilderFromDB = await dataSource
                .getRepository(Wilder)
                .findOneBy({ id: wilderId})
            
        if(wilderFromDB !== null){
            const gradesFromDB = await dataSource
                .getRepository(Grade)
                .find({ where: {wilder: wilderFromDB}});

            const gradeToDelete = gradesFromDB.find(grade => grade.skill.name === skill);

            if(gradeToDelete !== undefined) await dataSource.getRepository(Grade).remove(gradeToDelete);
            return true
        }
        return false
    }

    @Mutation(returns => Boolean)
    async deleteGradeById(
        @Arg("id") id: number
    ) : Promise<Boolean> {
        const gradeToDelete = await dataSource.getRepository(Grade).findOne({
            where: { id }
        });
        if(gradeToDelete !== null){
            await dataSource.getRepository(Grade).remove(gradeToDelete);
            return true;
        }
        return false
    }

    // @Mutation(returns => Grade)
    // async addWilderToGrade(
    //     @Arg('id') id: number,
    //     @Arg('wilderId') wilderId: number
    // ): Promise<void> {
    //     const wilderToAdd = await dataSource.getRepository(Wilder).findOne({
    //         where:{
    //             id: wilderId
    //         }
    //     })
    //     if(wilderToAdd !== null){
    //         await dataSource.getRepository(Grade).update({id}, {wilder: wilderToAdd})
    //     }
    // }
}