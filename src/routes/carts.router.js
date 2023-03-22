import { Router } from "express";
import CartManager from "../CartManager.js";

const router = Router();
const cartManager = new CartManager();
let carts = [];

// Pedido de el archivo completo de carts
router.get("/", async (req, res) => {
  const carts = await cartManager.getCarts();
  res.send({ carts });
});

// Pedido de un cart especifico por el cid (cart id)
router.get("/:cid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const cartsProd = await cartManager.getCartById(cid);
  res.send({ cartsProd });
});

// Crear un nuevo cart
router.post("/", async (req, res) => {
  const carts = await cartManager.addCart();
  return res.send({ carts });
});

// Agergar un nuevo producto pid (product id) a un cart cid (cart id)
router.post("/:cid/product/:pid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);

  const carts = await cartManager.updateCart(cid, pid);
  return res.send({ carts });
});

export default router;
