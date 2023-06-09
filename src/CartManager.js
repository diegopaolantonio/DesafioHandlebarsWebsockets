import fs from "fs";
import ProductManager from "./ProductManager.js";

const productManager = new ProductManager();

export default class CartManager {
  constructor() {
    this.path = "./files/carrito.json";
  }

  // Funcion para obtener los datos del archivo carrito.jason
  getCarts = async () => {
    if (fs.existsSync(this.path)) {
      const fileData = await fs.promises.readFile(this.path, "utf-8");
      const result = JSON.parse(fileData);
      return result;
    } else {
      return [];
    }
  };

  // Funcion para obtener los datos de un cart especifico por el id
  getCartById = async (cartId) => {
    const carts = await this.getCarts();

    const cartIndex = carts.findIndex((cart) => cart.id === cartId);

    if (cartIndex === -1) {
      return "Id not found";
    }
    return carts[cartIndex].products;
  };

  // Funcion para agregar un cart al arcihvo
  addCart = async () => {
    let carts = await this.getCarts();
    if (carts.length === 0) {
      carts = [
        {
          id: 1,
          products: [],
        },
      ];
    } else {
      const cart = {
        id: carts[carts.length - 1].id + 1,
        products: [],
      };
      carts.push(cart);
    }
    const string = JSON.stringify(carts, null, "\t");
    await fs.promises.writeFile(this.path, string);
    return carts;
  };

  // Funcion para agregar un producto por el id al cart undicado por su id
  updateCart = async (cartId, productId) => {
    const carts = await this.getCarts();
    const products = await productManager.getProducts();
    let cartProductIndex;
    const cartIndex = carts.findIndex((cart) => cart.id === cartId);

    if (cartIndex === -1) {
      return "Cart not found";
    } else {
      const productIndex = products.findIndex(
        (product) => product.id === productId
      );
      if (productIndex === -1) {
        return "Product not exist";
      } else {
        cartProductIndex = -1;
        carts[cartIndex].products.forEach((element, index) => {
          if (element.product === productId) {
            cartProductIndex = index;
          }
        });

        if (cartProductIndex === -1) {
          carts[cartIndex].products[carts[cartIndex].products.length] = {
            product: productId,
            quantity: 1,
          };
        } else {
          carts[cartIndex].products[cartProductIndex].quantity++;
        }

        const string = JSON.stringify(carts, null, "\t");
        await fs.promises.writeFile(this.path, string);

        return carts[cartIndex];
      }
    }
  };
}
