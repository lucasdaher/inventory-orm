import "reflect-metadata";
import { DataSource } from "typeorm";
// import { Category } from "./entities/Category";
// import { Product } from "./entities/Product";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "inventario_db",
});

// export const AppDataSource = new DataSource({
//   type: "mysql",
//   host: "localhost",
//   port: 3306,
//   username: "lucasdaher",
//   password: "",
//   database: "inventario_db",
//   synchronize: true,
//   logging: false,
//   entities: [Category, Product],
//   migrations: [],
//   subscribers: [],
// });
