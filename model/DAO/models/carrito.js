import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
    compra: Object,
    pedido: Array,
},{versionKey: false})

export const  CarritoModel = mongoose.model('carrito', carritoSchema);
