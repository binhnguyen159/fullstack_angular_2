
// import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import AppDataSource from "./appDataSource";
import { User } from "./entities/user.entity";

dotenv.config();
const app = express();


AppDataSource.initialize()
  .then(() => {
    console.log("Data source have been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

const port = Number(process.env.PORT) || 3001;

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = AppDataSource.getRepository(User);
  const users =  await userRepository.find()
  res.status(200).json(users);
});

app.listen(port, () => {
  console.log("App is running at port " + port);
});
