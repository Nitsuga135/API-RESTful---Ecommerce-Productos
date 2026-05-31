import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    usuario: String,
    password:String,
    admin: Boolean
},{versionKey: false})

export const  UsuarioModel = mongoose.model('usuario', usuarioSchema);
