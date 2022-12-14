const express = require("express");
const router = express.Router();

let clienteSchema = require("../db/schemas/clienteSchema");

router.post("/create", async function (req, res) {
    let newCliente = req.body;
    let result = await clienteSchema.createCliente(newCliente);
    res.json(result);
});

router.put("/update/:idCliente", async function (req, res) {
    let idCliente = req.params.idCliente;
    let updateCliente = req.body;
    let result = await clienteSchema.updateCliente(idCliente, updateCliente);
    res.json(result);
});

router.get("/get/:idCliente", async function (req, res) {
    let idCliente = req.params.idCliente;
    let result = await clienteSchema.getClienteById(idCliente);
    res.json(result);
});

router.get("/all", async function (req, res) {
    let result = await clienteSchema.getAllClientes();
    res.json(result);
});

router.delete("/delete/:idCliente", async function (req, res) {
    let idCliente = req.params.idCliente;
    let result = await clienteSchema.deleteCliente(idCliente);
    res.json(result);
});

module.exports = router;