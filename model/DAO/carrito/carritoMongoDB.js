import CnxMongoDB from "../../DBMongo.js";

class ModelMongoDB {

    constructor() {
        
    }

    obtenerCarrito = async () => {
        if( !CnxMongoDB.connection ) return [];

        const carrito = await CnxMongoDB.db.collection('carritos').find({}).toArray()
        return carrito;
    };

    guardarCarrito = async carrito => {
        if(!CnxMongoDB.connection){
            throw new Error("No hay conexión a la base de datos");
        }
        await CnxMongoDB.db.collection('carritos').insertOne(carrito);
        return carrito;
    };
}

export default ModelMongoDB;