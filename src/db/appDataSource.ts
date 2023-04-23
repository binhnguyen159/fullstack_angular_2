import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: ["*/entities/*.entity.ts"],
});

export default AppDataSource;
