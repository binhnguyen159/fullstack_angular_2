import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "binh",
  database: "postgres",
  synchronize: true,
  entities: ["*/entities/*.entity.ts"],
});

export default AppDataSource;
