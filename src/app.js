//levantamos el servidor
const express = require("express");
const app = express();
const PUERTO = 8080;
const exphbs = require("express-handlebars");
const socket = require("socket.io");
const viewsRouter = require("./routes/views.router.js");
const usuarios = require("./public/js/usuarios.js");

//middleware
app.use(express.static("./src/public"));

//express handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//rutas
app.use("/", viewsRouter);

//listen. guardamos una referencia del servidor
const httpServer = app.listen(PUERTO, () => {
  console.log("Conectado en http://localhost:8080");
});

//generamos una instancia de la conexion, y le pasamos la ref del servidor
const io = socket(httpServer);

//configuramos socket io
io.on("connection", (socket) => {
  //traigo elparametro socket
  console.log("un cliente se ha conectado");
  //escucho el evento "menasje" desde el cliente
  socket.on("mensaje", (data) => {
    console.log(data);
  });

  //ahora el servidor le va a mandar un mensaje al cliente

  socket.emit("saludo", "hola cliente, soy el servidor");

  //mandamos un array de usuario al cliente y luego vamos al main.js
  socket.emit("usuarios", usuarios);
});
