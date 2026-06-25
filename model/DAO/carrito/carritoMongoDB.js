import CnxMongoDB from "../../DBMongo.js";
import { CarritoModel } from '../models/carrito.js';

class ModelMongoDB {

    constructor() {
        
    }

    obtenerCarrito = async () => {
        if( !CnxMongoDB.connection ) return [];

        const carrito = await CarritoModel.find({});
        return carrito;
    };

    guardarCarrito = async carrito => {
        if(!CnxMongoDB.connection){
            throw new Error("No hay conexión a la base de datos");
        }
        const carritoModel = new CarritoModel(carrito);
        const savedCarrito = await carritoModel.save();
        return savedCarrito;
    };
}

export default ModelMongoDB;