const express = require("express");
const router = express.Router();

let productoSchema = require("../db/schemas/productoSchema");

router.get("/get/:idProducto", async function (req, res) {
    let idProducto = req.params.idProducto;
    let result = await productoSchema.getProductoById(idProducto);
    res.json(result);
});

router.get("/all", async function (req, res) {
    let result = await productoSchema.getAllProductos();
    res.json(result);
});

router.delete("/delete/:idProducto", async function (req, res) {
    let idProducto = req.params.idProducto;
    let result = await productoSchema.deleteProducto(idProducto);
    res.json(result);
});

module.exports = router;