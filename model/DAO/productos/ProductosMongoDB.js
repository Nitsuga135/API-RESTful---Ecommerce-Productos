import CnxMongoDB from "../../DBMongo.js";
import { ProductoModel } from '../models/productos.js';

class ModelMongoDB {

    constructor() {
        
    }

    obtenerProductos = async () => {
        if( !CnxMongoDB.connection ) return [];

        const productos = await ProductoModel.find({})
        return productos;
    };

    obtenerProducto = async id => {
        if( !CnxMongoDB.connection ) return [];

        const productos = await ProductoModel.findOne({ _id: id })
        return productos;
    };

    guardarProducto = async producto => {
        if( !CnxMongoDB.connection ) return [];

        if(producto.precio) producto.precio = Number(producto.precio);
        if(producto.stock !== undefined) producto.stock = producto.stock ? parseInt(producto.stock) : 0;

        const productoModel = new ProductoModel(producto);
        const resultado = await productoModel.save();
        return await this.obtenerProducto(resultado._id);
    };

    actualizarProducto = async (id, producto) => {
        if( !CnxMongoDB.connection ) return [];

        if(producto.precio) producto.precio = Number(producto.precio);
        if(producto.stock !== undefined) producto.stock = producto.stock ? parseInt(producto.stock) : 0;

        await ProductoModel.updateOne({ _id: id }, { $set:producto });
        const productoActualizado = await this.obtenerProducto(id)
        return productoActualizado;
    };


    borrarProducto = async id => {
        if( !CnxMongoDB.connection ) return null;

        const productoEliminado = await this.obtenerProducto(id)
        await ProductoModel.deleteOne({ _id: id });
        return productoEliminado;
    };
}

export default ModelMongoDB;
