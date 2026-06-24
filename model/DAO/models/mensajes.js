import mongoose from "mongoose";

const mensajesSchema = new mongoose.Schema({
    mensaje: String,
    usuario:String,
},{versionKey: false})

export const  MensajesModel = mongoose.model('mensajes', mensajesSchema);
