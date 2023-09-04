import express from "express";
import db from "./utils/database.js";
import Todo from "./models/todos.model.js";

Todo;

const PORT = 8000;

//probar conexion con la base de datos
db.authenticate()
  .then(() => {
    console.log("Conexion correcta");
  })
  .catch((error) => {
    console.log(error);
  });

//si la tabla ya existe y hay modificaciones, altera la tabla {alter: true}
db.sync(/* { alter: true } */) // si la tabla no existe, la crea... si ya existe, hace nada
  .then(() => console.log("Base de datos sincronizada"))
  .catch((error) => console.log(error));

const app = express();

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("OK");
});

// CREATE todo
// cuando se haga una request a /todo de tipo POST se crea una terea
app.post("/todos", async (req, res) => {
  try {
    //obtenemos la info del body
    const { body } = req;
    //mandar esta info a la base de datos
    //* INSERT INTO todos (id, title, description, etc)
    const todo = await Todo.create(body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
});

//GET ---> devolver un json con todos los todos de la basee de datos
//SELECT * from todos;
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    res.status(400).json(error);
  }
});

//SELECT * from todos WHERE id=1;
//GET /todos/:id
//path params
app.get("/todos/:id", async (req, res) => {
  try {
    //recuperar el parametro de ruta
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    res.json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
});

//UPDATE todo WHERE id =1
//PUT /todos  ----> enviamos el id por el path params
//la informacion a actualizar por el body
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    // primer obejeto es la info actulizada
    // segundo objeto es la clausula where
    const todo = await Todo.update(body, {
      where: { id },
    });
    res.json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
});

//DELETE todo WHERE ...
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.destroy({
      where: { id },
    });
    res.status(204).end(); // termina con la peticion
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
