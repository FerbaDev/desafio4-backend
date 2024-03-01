const express = require("express");
const router = express.Router();

const ProductManager = require("../controllers/productManager.js");
const productManager = new ProductManager("./src/models/productos.json");

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("home", {products: products} );
  } catch (error) {
    console.log("Error al recuperar productos", error);
    res.status(500).json({error: "Error interno del servidor"})
  }
  
});

router.get("/realTimeProducts", (req, res) => {
  res.render("realTimeProducts");
});

module.exports = router;
