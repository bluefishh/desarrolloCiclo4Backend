console.log("Cargando configuracion...");
//Importar las dependencias
const express = require("express");

//Cargar configuracion app WEB
const appConfig = require("./config");

console.log("Inicializar la Aplicacion WEB...");
//Inicializar una APLICACION WEB
require("./db/dbInitializer");
const app = express();

// 1) Metodo HTTP (verbos HTTP)
// 2) RUTA (VIrtual)
// 3) EL ALGORITMO QUE YO PROGRAMO PARA RESPONDER ESA PETICION

console.log("Configurando Routers...");
const clientesRouter = require("./routes/routerClientes");
const productosRouter = require("./routes/routerProductos");

//Configuracion de ROUTERS

app.use("/api/clientes", clientesRouter);
app.use("/api/productos", productosRouter);

app.get(
    "/",

    function (req, res) {
        res.send("Hello World!");
    }
);

console.log("Iniciando Servidor");

let server = app.listen(
    appConfig.PORT,

    function () {
        console.log(`La aplicacion WEB esta escuchando en el PUERTO: ` + appConfig.PORT);
    }
);