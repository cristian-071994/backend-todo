import { Sequelize } from "sequelize";
import "dotenv/config";

// configuracion de la conexion a la base de datos
const db = new Sequelize({
  host: /* "localhost", */ process.env.DB_HOST,
  username: /* "postgres", */ process.env.DB_USERNAME,
  database: /* "todos", */ process.env.DB_DATABASE,
  port: /* 5432, */ process.env.DB_PORT,
  password: /* "root", */ process.env.DB_PASSWORD,
  dialect: "postgres",
  dialectOptions: { ssl: { required: true, rejectUnauthorized: false } },
});

//para local, comentamos el dialectOptions

export default db;
