const express = require("express");
const router = express.Router();

let deudaSchema = require("../db/schemas/deudaSchema");

router.post("/create", async function (req, res) {
    let newDeuda = req.body;
    let result = await deudaSchema.createDeuda(newDeuda);
    res.json(result);
});

router.get("/get/:idDeuda", async function (req, res) {
    let idDeuda = req.params.idDeuda;
    let result = await deudaSchema.getDeudaById(idDeuda);
    res.json(result);
});

router.get("/all", async function (req, res) {
    let result = await deudaSchema.getAllDeudas();
    res.json(result);
});

router.delete("/delete/:idDeuda", async function (req, res) {
    let idDeuda = req.params.idDeuda;
    let result = await clienteSchema.deleteDeuda(idDeuda);
    res.json(result);
});

module.exports = router;