import "reflect-metadata";
import { DataSource } from "typeorm";
import CustomNamingStrategy from "./CustomNamingStrategy";
import { Book } from "./entity/Book";
import { Review } from "./entity/Review";
import { User } from "./entity/User";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "noveler",
  password: "noveler",
  database: "noveler",
  entities: [User, Book, Review],
  synchronize: true,
  logging: false,
  namingStrategy: new CustomNamingStrategy(),
});

export default AppDataSource;
