console.log("Cargando configuracion...");
const express = require("express");
var bodyParser = require("body-parser");
let cors = require("cors");

const appConfig = require("./config");

console.log("Inicializar la Aplicacion WEB...");
require("./db/dbInitializer");
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

console.log("Configurando Routers...");
const clientesRouter = require("./routes/routerClientes");
const productosRouter = require("./routes/routerProductos");
const deudasRouter = require("./routes/routerDeudas");

//Configuracion de ROUTERS
app.use("/api/clientes", clientesRouter);
app.use("/api/productos", productosRouter);
app.use("/api/deudas", deudasRouter);

console.log("Iniciando Servidor");

let server = app.listen(
    appConfig.PORT,

    function () {
        console.log(`La aplicacion WEB esta escuchando en el PUERTO: ` + appConfig.PORT);
    }
);