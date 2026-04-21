import CnxMongoDB from "../../DBMongo.js";
import { ObjectId } from "mongodb";

class ModelMongoDB {

    constructor() {
        
    }

    obtenerProductos = async () => {
        if( !CnxMongoDB.connection ) return [];

        const productos = await CnxMongoDB.db.collection('productos').find({}).toArray()
        return productos;
    };

    obtenerProducto = async id => {
        if( !CnxMongoDB.connection ) return [];

        const productos = await CnxMongoDB.db.collection('productos').findOne({ _id: new ObjectId(id) })
        return productos;
    };

    guardarProducto = async producto => {
        if( !CnxMongoDB.connection ) return [];

        if(producto.precio) producto.precio = Number(producto.precio);
        if(producto.stock !== undefined) producto.stock = producto.stock ? parseInt(producto.stock) : 0;

        const resultado = await CnxMongoDB.db.collection('productos').insertOne(producto);
        return await this.obtenerProducto(resultado.insertedId);
    };

    actualizarProducto = async (id, producto) => {
        if( !CnxMongoDB.connection ) return [];

        if(producto.precio) producto.precio = Number(producto.precio);
        if(producto.stock !== undefined) producto.stock = producto.stock ? parseInt(producto.stock) : 0;

        await CnxMongoDB.db.collection('productos').updateOne({ _id: new ObjectId(id) }, { $set:producto });
        const productoActualizado = await this.obtenerProducto(id)
        return productoActualizado;
    };


    borrarProducto = async id => {
        if( !CnxMongoDB.connection ) return null;

        const productoEliminado = await this.obtenerProducto(id)
        await CnxMongoDB.db.collection('productos').deleteOne({ _id: new ObjectId(id) });
        return productoEliminado;
    };
}

export default ModelMongoDB;
