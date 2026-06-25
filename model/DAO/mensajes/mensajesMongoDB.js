import CnxMongoDB from "../../DBMongo.js";
import { MensajesModel } from '../models/mensajes.js';

class ModelMongoDB {

    constructor() {
        
    }

    obtenerMensajes = async () => {
        if( !CnxMongoDB.connection ) return [];

        const mensajes = await MensajesModel.find({});
        return mensajes;
    };

    guardarMensaje = async mensajes => {
        if(!CnxMongoDB.connection){
            throw new Error("No hay conexión a la base de datos");
        }
        const mensajesModel = new MensajesModel(mensajes);
        const savedMensajes = await mensajesModel.save();
        return savedMensajes;
    };
}

export default ModelMongoDB;