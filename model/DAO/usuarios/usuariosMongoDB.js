import CnxMongoDB from "../../DBMongo.js";
import { UsuarioModel } from '../models/usuario.js';

class ModelMongoDB {

    constructor() {
        this.usuarios = [];
    }

    loginUsuario = async () => {
        if(!CnxMongoDB.connection){
            throw new Error("No hay conexión a la base de datos");
        }
        const usuarios = await UsuarioModel.find({});
        return usuarios;
    };

    guardarUsuario = async credenciales => {
        if(!CnxMongoDB.connection){
            throw new Error("No hay conexión a la base de datos");
        }
        const usuarioModel = new UsuarioModel(credenciales);
        const savedUsuario = await usuarioModel.save();
        return savedUsuario;
    };
}

export default ModelMongoDB;
