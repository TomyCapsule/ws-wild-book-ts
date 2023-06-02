import { Resolver, Query, Arg, Mutation } from 'type-graphql'
import { Wilder } from '../entity/Wilder';
import dataSource from '../utils';
import { Grade } from '../entity/Grade';

@Resolver(Wilder)
export class WilderResolver {
    @Query(returns => [Wilder])
    async getAllWilders(): Promise<Wilder[]>{
        const allWilders = await dataSource.manager.find(Wilder, {
            relations: {
                grades: {
                    skill: true,
                }
            }
        });
        return allWilders
    }

    @Query(returns => Wilder)
    async getWilderById(@Arg("id") id: number): Promise<Wilder | null> {
        const wilderRepository = dataSource.manager.getRepository(Wilder);
        const wilder = await wilderRepository.findOne({
            where: {
                id
            },
            relations: {
                grades: {
                    skill: true,
                    wilder: true
                }
            }
        })
        return wilder;
    }

    @Mutation(returns => Wilder)
    async createWilder(
        @Arg("name") name: string,
        @Arg("city") city: string,
        @Arg("avatar") avatar: string
    ) : Promise<Wilder | null>{
        const newWilder = await dataSource.manager.save(Wilder, {name, city, avatar, grades: []});
        return newWilder;
    }

    @Mutation(returns => Wilder)
    async updateWilder(
        @Arg("id") id: number,
        @Arg("name") name: string,
        @Arg("city") city: string,
        @Arg("avatar") avatar: string,
        @Arg("description") description: string
    ) : Promise<Wilder | null> {
        try {
            const wilderRepo = dataSource.getRepository(Wilder);
            await wilderRepo.update(id, {
                name,
                city,
                avatar,
                description
            });
            const modifiedWilder = await dataSource.getRepository(Wilder).findOne({
                where: {
                    id
                },
                relations: {
                    grades: {
                        skill: true,
                        wilder: true
                    }
                }
            });
            return modifiedWilder;
        } catch (error) {
            console.log(error);
            return null
        }
    }

    @Mutation(returns => Number)
    async deleteWilder(
        @Arg("id") id: number
    ) : Promise<number | null> {
        const wilderToDelete = await dataSource.getRepository(Wilder).findOne({
            where: {
                id
            }
        });
        if (wilderToDelete !== null){
            const deletedId = {...wilderToDelete}.id;
            await dataSource.getRepository(Grade).delete({wilder: wilderToDelete});
            await dataSource.getRepository(Wilder).remove(wilderToDelete);
            return deletedId;
        }
        return wilderToDelete
    }
}