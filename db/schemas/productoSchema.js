let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schemaConfig = {
    title: String,
    description: String,
    price: Number,
}

const productoSchema = new Schema(schemaConfig);

let ProductoModel = new mongoose.model("producto", productoSchema);

async function createProducto(producto) {
    try {
        let newProducto = new ProductoModel();
        newProducto.title = producto.title,
        newProducto.description = producto.description,
        newProducto.price = producto.price;
        let result = await newProducto.save();
        return result;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}

async function updateProducto(id, producto) {
    try {
        let result = await ProductoModel.findByIdAndUpdate(id, {
            title: producto.title,
            description: producto.description,
            price: producto.price,
        });
        return result;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}

async function deleteProducto(id) {
    try {
        let result = await ProductoModel.findByIdAndRemove(id).exec();
        return result;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}

async function getAllProductos() {
    try {
        let filter = {};
        let cursor = ProductoModel.find(filter).cursor();
        let result = [];
        let currentProducto = await cursor.next();
        while (currentProducto != null) {
            result.push(currentProducto);
            currentProducto = await cursor.next();
        }
        return result;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}

async function getProductoById(id) {
    try {
        let cursor = ProductoModel.findById(id).cursor();
        let user = await cursor.next();
        return user;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}

module.exports = {
    productoSchema,
    createProducto,
    updateProducto,
    deleteProducto,
    getAllProductos,
    getProductoById,
}