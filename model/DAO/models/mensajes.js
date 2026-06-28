import mongoose from "mongoose";

const mensajesSchema = new mongoose.Schema({
    texto: String,
    usuario:String,
    admin: Boolean,
    fechaYHora: String

},{versionKey: false})

export const  MensajesModel = mongoose.model('mensajes', mensajesSchema);
