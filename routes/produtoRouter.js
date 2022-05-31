const express = require("express");
const router = express.Router();
const Produto = require("../controller/produtoController");
// const {
//     getAllProduct,
//     getProductId,
//     createProducts,
//     updateProducts,
//     deleteProducts,
// } = require ("../controller/produtoController");

// A definição de rotas aceita a seguinte estrutura:
// app.METHOD(PATH, HANDLER)

//http://localhost:3005/
router.get("/", Produto.getAllProducts);
// http://localhost:3005/produto
router.get("/produtos", Produto.getAllProducts);
// http://localhost:3005/produto/id
router.get("/produtos/:id", Produto.getOneProduct);
// http://localhost:3005/produto
router.post('/produtos', Produto.createProduct);
// http://localhost:3005/produto/id
router.put('/produtos/:id', Produto.updateProduct);
// http://localhost:3005/produto/id
router.delete('/produtos/:id', Produto.deleteProduct);
router.delete('/produtos', Produto.deleteAllProducts);
module.exports = router
