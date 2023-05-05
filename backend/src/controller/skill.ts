import dataSource from "../utils";
import { Skill } from "../entity/Skill";
import { IController } from "./types";

const skillController: IController = {
    create: async (req, res) => {
        try {
            await dataSource.getRepository(Skill).save(req.body);
            res.send("Created skill");
        } catch (error) {
            console.log(error);
            res.send("Error while creating skill");
        }
    },
    read: async (req, res) => {
        try {
            const data = await dataSource.getRepository(Skill).find();
            res.send(data);
        } catch (error) {
            console.log(error);
            res.send("error while querying skills");
        }
    },
    delete: async (req, res) => {
        try {
            await dataSource.getRepository(Skill).delete(req.body);
            res.send("deleted");
        } catch (error) {
            console.log(error);
            res.send("error while deleting skill");
        }
    },
    update: async (req, res) => {
        try {
            await dataSource
                .getRepository(Skill)
                .update(req.body.id, req.body.newData);
            res.send("Updated");
        } catch (error) {
            console.log(error);
            res.send("error while updating skill");
        }
    },
};

export default skillController;
