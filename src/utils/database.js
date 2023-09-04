import { Sequelize } from "sequelize";

// configuracion de la conexion a la base de datos
const db = new Sequelize({
  server: "localhost",
  username: "postgres",
  database: "todos",
  port: 5432,
  password: "root",
  dialect: "postgres",
});

export default db;
