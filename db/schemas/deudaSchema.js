let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let schemaConfig = {
    cliente: {
        type: Schema.ObjectId,
        ref: "cliente",
    },
    productos: {
        type: Schema.ObjectId,
        ref: "producto",
    },
    fechaFiada: { type: Date, default: Date.now },
    precioTotal: Number,
};

const deudaSchema = new Schema(schemaConfig);

let DeudaModel = new mongoose.model("deuda", deudaSchema);

async function createDeuda(deuda) {
    try {
        let newDeuda = new DeudaModel();
        newDeuda.cliente = deuda.cliente;
        newDeuda.productos = deuda.productos;
        newDeuda.precioTotal = deuda.precioTotal;
        let result = await newDeuda.save();
        return result;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}

async function deleteDeuda(id) {
    try {
        let result = await DeudaModel.findByIdAndRemove(id).exec();
        return result;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}

async function getAllDeudas() {
    let populateCliente = { 
        path: 'clientes', 
        select: 'firstName lastName'
    }
    let populateProducto = { 
        path: 'productos', 
        select: 'title'
    }
    try {
        let filter = {};
        let cursor = DeudaModel.find(filter).populate(populateCliente).populate(populateProducto).cursor().exec();
        let result = [];
        let currentDeuda = await cursor.next();
        while (currentDeuda != null) {
            result.push(currentDeuda);
            currentDeuda = await cursor.next();
        }
        return result;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}

async function getDeudaById(id) {
    try {
        let cursor = DeudaModel.findById(id).cursor();
        let user = await cursor.next();
        return user;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}

module.exports = {
    deudaSchema,
    createDeuda,
    deleteDeuda,
    getAllDeudas,
    getDeudaById,
};
