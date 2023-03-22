import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { Server } from "socket.io"
import viewsRouter from "./routes/views.router.js"
import ProductManager from "./ProductManager.js";

const app = express();
const productManager = new ProductManager();

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(`${__dirname}/public`));

app.use("/", viewsRouter)
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);




const httpServer = app.listen(8080, () => {
    console.log("Server on port 8080");
  });  

  const io = new Server(httpServer);

  //Coneccion con el servidor
io.on("connection", async (socket) => {
  console.log("Cliente conectado");
  let products = await productManager.getProducts();
  io.emit("getProduct", products);

  socket.on("addProduct", async (product) => {
    products = await productManager.addProduct(product);
    io.emit("addProduct", products);
  });

  socket.on("deleteProduct", async (pid) => {
    products = await productManager.deleteProduct(parseInt(pid));
    io.emit("deleteProduct", products);
  });

  socket.on("getProduct", async () => {
    let products = await productManager.getProducts();
    io.emit("getProduct", products);
  });
});
