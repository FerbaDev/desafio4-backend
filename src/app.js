//levantamos el servidor
const express = require("express");
const app = express();
const PUERTO = 8080;
const exphbs = require("express-handlebars");
const socket = require("socket.io");

//rutas
const viewsRouter = require("./routes/views.router.js");
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");

//middleware static
app.use(express.static("./src/public"));
//configuramos middleware para recibir datos en formato json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//express handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//rutas
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

//listen. guardamos una referencia del servidor
const httpServer = app.listen(PUERTO, () => {
  console.log("Conectado en http://localhost:8080");
});

//requerimos los productos
const ProductManager = require("./controllers/productManager.js");
const productManager = new ProductManager("./src/models/productos.json");

//generamos una instancia de la conexion, y le pasamos la ref del servidor
const io = socket(httpServer);

//configuramos socket io
io.on("connection", async (socket) => {
  console.log("un cliente se ha conectado");
  const products = await productManager.getProducts();
  //mandamos un array de productos al cliente y luego vamos al main.js
  socket.emit("productos", products);

  //escucho evento eliminar desde el cliente
  socket.on("deleteProduct", async (id) => {
    await productManager.deleteProduct(id);
    const products = await productManager.getProducts();
    io.sockets.emit("products", products)
    
  });

  //le mando la lista actualizada al cliente
});


