import express from 'express';
import cors from 'cors';
import dataSource from './utils';
import wilderController from './controller/wilder';
import skillController from './controller/skill';
import gradeController from './controller/grade';

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/wilder", wilderController.create);
app.get("/api/wilder", wilderController.read);
app.get("/api/wilder/:id", wilderController.readOne);
app.get("/api/wilder/all", wilderController.readAll);
app.put("/api/wilder", wilderController.update);
app.delete("/api/wilder", wilderController.delete);
app.put("/api/wilder/avatar", wilderController.addAvatar);

app.post("/api/skill", skillController.create);
app.get("/api/skill", skillController.read);
app.delete("/api/skill", skillController.delete);
app.put("/api/skill", skillController.update);

app.post("/api/grade", gradeController.create);
app.get("/api/grade", gradeController.read);
app.delete("/api/grade", gradeController.delete);

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

const start = async () : Promise<void> => {
  await dataSource.initialize();
  app.listen(5000, () => console.log("Server started on 5000"));
};

void start();