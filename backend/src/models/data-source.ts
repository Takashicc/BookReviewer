import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import CustomNamingStrategy from "./CustomNamingStrategy";
import { Book } from "./entity/Book";
import { Review } from "./entity/Review";
import { User } from "./entity/User";

const mode = process.env.ENVIRONMENT || "development";
let dataSourceOptions: DataSourceOptions;
if (mode === "development") {
  dataSourceOptions = {
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
  };
} else {
  dataSourceOptions = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [User, Book, Review],
    synchronize: true,
    logging: false,
    namingStrategy: new CustomNamingStrategy(),
  };
}

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
