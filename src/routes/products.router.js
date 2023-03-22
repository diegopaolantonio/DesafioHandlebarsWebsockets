import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();
const productManager = new ProductManager();

// Pedido de todos los productos y con limite
router.get("/", async (req, res) => {
  const limit = req.query.limit;
  const products = await productManager.getProducts();
  console.log(products);

  if (!limit) {
    res.send({ products });
  } else {
    let productsLimit = [];
    for (let i = 0; i < limit && i < products.length; i++) {
      productsLimit.push(products[i]);
    }
    res.send(productsLimit);
  }
});

// Pedido de un product especifico por el pid (product id)
router.get("/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid);
  const product = await productManager.getProductById(pid);
  res.send(product);
});

// Agregar un nuevo product
router.post("/", async (req, res) => {
  const product = req.body;
  const products = await productManager.addProduct(product);
  return res.send({ products /*status: "Success"*/ });
});

// Actualizar los datos de un product epecifico por el pid (product id)
router.put("/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid);
  const updateProduct = req.body;
  const products = await productManager.updateProduct(pid, updateProduct);
  return res.send({ products });
});

// Eliminar un product especifico por el pid (product id)
router.delete("/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid);
  const products = await productManager.deleteProduct(pid);
  return res.send({ products });
});

export default router;
