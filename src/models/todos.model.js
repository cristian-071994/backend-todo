import { DataTypes } from "sequelize";
import db from "../utils/database.js";

const Todo = db.define("todos", {
  //se definen los atributos de la tabla o modelo a crear
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titile: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(70),
    allowNull: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

export default Todo;
