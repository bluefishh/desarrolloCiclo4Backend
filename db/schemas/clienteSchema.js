let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let schemaConfig = {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
};

const clienteSchema = new Schema(schemaConfig);

let ClienteModel = new mongoose.model("cliente", clienteSchema);

async function createCliente(cliente) {
    try {
        let newCliente = new ClienteModel();
        newCliente.firstName = cliente.firstName;
        newCliente.lastName = cliente.lastName;
        newCliente.email = cliente.email;
        newCliente.phone = cliente.phone;
        let result = await newCliente.save();
        return result;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}

async function updateCliente(id, cliente) {
    try {
        let result = await ClienteModel.findByIdAndUpdate(id, {
            firstName: cliente.firstName,
            lastName: cliente.lastName,
            email: cliente.email,
            phone: cliente.phone,
        });
        return result;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}

async function deleteCliente(id) {
    try {
        let result = await ClienteModel.findByIdAndRemove(id).exec();
        return result;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}

async function getAllClientes() {
    try {
        let filter = {};
        let cursor = ClienteModel.find(filter);
        let result = [];
        let currentCliente = await cursor.next();
        while (currentCliente != null) {
            result.push(currentCliente);
            currentCliente = await cursor.next();
        }
        return result;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}

async function getClienteById(id) {
    try {
        let cursor = ClienteModel.findById(id).cursor();
        let user = await cursor.next();
        return user;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}

module.exports = {
    clienteSchema,
    updateCliente,
    createCliente,
    deleteCliente,
    getAllClientes,
    getClienteById,
};
