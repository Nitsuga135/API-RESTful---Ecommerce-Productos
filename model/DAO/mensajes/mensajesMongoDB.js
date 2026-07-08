import CnxMongoDB from "../../DBMongo.js";
import { MensajesModel } from '../models/mensajes.js';
import { CanalModel } from '../models/canal.js';

class ModelMongoDB {

    // Busca el canal de un usuario por su ObjectId
    obtenerCanalPorUsuario = async (idUsuario) => {
        if (!CnxMongoDB.connection) return null;
        return await CanalModel.findOne({ idUsuario });
    }

    // Crea un canal nuevo para el usuario
    crearCanal = async (idUsuario) => {
        if (!CnxMongoDB.connection) throw new Error("No hay conexión a la base de datos");
        const canal = new CanalModel({ idUsuario });
        return await canal.save();
    }

    // Lista todos los canales con el nombre del usuario (para el panel del admin)
    obtenerCanales = async () => {
        if (!CnxMongoDB.connection) return [];
        return await CanalModel.find({}).populate('idUsuario', 'usuario admin');
    }

    // Mensajes de un canal.
    // mostrarTodos=false → solo estado_visible:true (para el cliente)
    // mostrarTodos=true  → todos los mensajes (para el admin)
    obtenerMensajesPorCanal = async (canalId, mostrarTodos = false) => {
        if (!CnxMongoDB.connection) return [];
        const query = { canal: canalId };
        if (!mostrarTodos) query.estado_visible = true;
        return await MensajesModel.find(query).sort({ fechaYHora: 1 });
    }

    guardarMensaje = async (mensajeData) => {
        if (!CnxMongoDB.connection) throw new Error("No hay conexión a la base de datos");
        const mensajeModel = new MensajesModel(mensajeData);
        return await mensajeModel.save();
    }

    // El admin borra: pone estado_visible en false (el cliente no lo ve más)
    borrarMensaje = async (idMensaje) => {
        if (!CnxMongoDB.connection) throw new Error("No hay conexión a la base de datos");
        return await MensajesModel.findByIdAndUpdate(
            idMensaje,
            { estado_visible: false },
            { new: true }
        );
    }

    // Marca como vistos los mensajes enviados por un emisor específico dentro de un canal
    // Ej: admin abre el chat → marca como vistos los mensajes del cliente
    //     cliente abre el chat → marca como vistos los mensajes del admin
    marcarMensajesVistos = async (canalId, emisorAMarcar) => {
        if (!CnxMongoDB.connection) return;
        await MensajesModel.updateMany(
            { canal: canalId, usuario: emisorAMarcar, visto: false },
            { visto: true }
        );
    }
}

export default ModelMongoDB;