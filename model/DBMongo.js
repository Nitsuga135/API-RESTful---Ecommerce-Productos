import mongoose from "mongoose";
import config from "../config/config.js";

class CnxMongoDB {

    static connection = false;

    static conectar = async _ => {
        try {

            if (CnxMongoDB.connection) return mongoose.connection;

            console.log('Conectando a la base de datos...');
            await mongoose.connect(config.STRCNX, { dbName: config.BASE });
            console.log('Base de datos conectada');

            CnxMongoDB.connection = true;

        } catch (error) {
            console.log(`Error en conexion de base de datos: ${error}`);
            throw error;
        }
    }

}

export default CnxMongoDB;
