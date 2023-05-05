import dataSource from "../utils";
import { Grade } from "../entity/Grade";
import { Skill } from "../entity/Skill";
import { Wilder } from "../entity/Wilder";
import { IController } from "./types";

const gradeController: IController = {
    read: async (req, res) => {
        try {
            const gradesFromDB = await dataSource.getRepository(Grade).find();
            res.send(gradesFromDB);
        } catch (error) {
            console.log(error);
            res.send("Error while reading grades");
        }
    },
    create: async (req, res) => {
        try {
            const wilderFromDB = await dataSource
                .getRepository(Wilder)
                .findOneBy({ name: req.body.wilder });

            let skillFromDB = await dataSource
                .getRepository(Skill)
                .findOneBy({ name: req.body.skill });
            
            if(skillFromDB === null){
                skillFromDB = await dataSource.getRepository(Skill).save({name: req.body.skill});
            }

            if (wilderFromDB !== null && skillFromDB !== null) {
                const gradeExists = await dataSource.getRepository(Grade).findOneBy({wilder: wilderFromDB, skill: skillFromDB});
                if(gradeExists === null){
                    await dataSource.getRepository(Grade).save({
                        grade: req.body.grade,
                        skill: skillFromDB,
                        wilder: wilderFromDB,
                    });
                }else{
                    await dataSource.getRepository(Grade).update({wilder: wilderFromDB, skill: skillFromDB}, {grade: req.body.grade});
                }
                res.send("Created Grade");
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log(error);
            res.send("Error while creating grade");
        }
    },
    delete: async (req, res) => {
        try {
            const wilderFromDB = await dataSource
                .getRepository(Wilder)
                .findOneBy({ name: req.body.wilderName})
            
            if(wilderFromDB !== null){
                const gradesFromDB = await dataSource
                    .getRepository(Grade)
                    .find({ where: {wilder: wilderFromDB}});

                const gradeToDelete = gradesFromDB.find(grade => grade.skill.name === req.body.gradeToDelete.title);

                if(gradeToDelete !== undefined) await dataSource.getRepository(Grade).remove(gradeToDelete);
                res.send("Deletion complete");
            }
        } catch (err) {
            console.error(err);
            res.send("Error while deleting grades");
        }
    }
};

export default gradeController;
