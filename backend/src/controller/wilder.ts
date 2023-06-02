import dataSource from "../utils";
import { Wilder } from "../entity/Wilder";
import { Grade } from "../entity/Grade";
import { IController } from "./types";

interface FormattedSkill {
    title: string,
    votes: number
}

interface FormattedWilder extends Wilder{
    skills: FormattedSkill[] 
}

const wilderController: IController = {
    create: async (req, res) => {
        try {
            const wilderResponse : Wilder = await dataSource.getRepository(Wilder).save(req.body);
            const createdWilder = await formatWilder(wilderResponse.id);
            res.send(createdWilder);
        } catch (error) {
            console.log(error);
            res.send("Error while creating wilder");
        }
    },
    read: async (req, res) => {
        try {
            const grades = await dataSource.getRepository(Grade).find();
            const wilders = await dataSource.getRepository(Wilder).find();
            const data = wilders.map((wilder) => {
                const wilderGrades = grades.filter(
                    (grade) => grade.wilder.id === wilder.id
                );
                const wilderGradesLean = wilderGrades.map((el) => {
                    return { title: el.skill.name, votes: el.grade };
                });
                const result = {
                    ...wilder,
                    skills: wilderGradesLean,
                };
                console.log(result);
                return result;
            });
            res.send(data);
        } catch (error) {
            console.log(error);
            res.send("error while querying wilders");
        }
    },
    readAll: async (req, res) => {
        try {
            const wilders = await dataSource
                .getRepository(Wilder)
                .find({ relations: { grades: true } });
            console.log("wilders", wilders);
            res.send(wilders);
        } catch (err) {
            console.log(err);
            res.status(500).send("Something broke...");
        }
    },
    readOne: async (req, res) => {
        try {
            const wilder = await formatWilder(Number(req.params.id))
            res.send(wilder);
        } catch (err) {
            console.log(err);
            res.status(500).send("Something broke...");
        }
    },
    delete: async (req, res) => {
        try {
            const wilderToDelete = await dataSource
                .getRepository(Wilder)
                .findOneBy({ id: req.body.id });
            const deletedId = {...wilderToDelete}.id;
            if (wilderToDelete !== null){
                await dataSource.getRepository(Grade).delete({wilder: wilderToDelete});
                await dataSource.getRepository(Wilder).remove(wilderToDelete);
                res.send(String(deletedId));
            }
            else throw new Error();
        } catch (error) {
            console.log(error);
            res.send("error while deleting wilder");
        }
    },
    update: async (req, res) => {
        try {
            const wilderRepo = dataSource.getRepository(Wilder);
            await wilderRepo.update(req.body.id, {
                name: req.body.name,
                city: req.body.city,
                avatar: req.body.avatar,
                description: req.body.description
            });
            const wilder = await formatWilder(req.body.id);
            res.send(wilder);
        } catch (error) {
            console.log(error);
            res.send("error while updating wilder");
        }
    },
    addAvatar: async (req,res) => {
        try{
            const wilderRepo = dataSource.getRepository(Wilder);
            await wilderRepo.update(req.body.id, {
                avatar: req.body.avatar
            });
            const wilder = await formatWilder(req.body.id);
            res.send(wilder);
        }catch(err){
            console.log(err);
            res.status(500).send('Error while updating avatar')
        }
    },
    test: async (req,res) => {
        const wilderRepo = dataSource.getRepository(Wilder);
        const wilders = await wilderRepo.find();
        for(const wilder of wilders){
            await wilderRepo.update(wilder.id, { avatar: wilder.name });
        }
    }
};

async function formatWilder(id: number) : Promise<FormattedWilder | null> {
    try{
        const wilderRepo = dataSource.getRepository(Wilder);
        const wilder = await wilderRepo.findOne({
            where: { id },
            relations: { grades: true },
        });
        if(wilder !== null){
            const skills = wilder.grades.map((grade) => ({
                title: grade.skill.name,
                votes: grade.grade,
            }));
            const formattedWilder = {
                ...wilder,
                skills,
            };
            return formattedWilder as FormattedWilder;
        }else throw new Error('Wilder not found');
    }catch(err){
        console.error(err);
        return null
    }
}

export default wilderController;
