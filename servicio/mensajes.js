import ModelFactory from '../model/DAO/mensajes/mensajesFactory.js';
import config from '../config/config.js';
import ServicioUsuarios from './usuarios.js';

class Servicio {

    constructor() {
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA);
        this.servicioUsuarios = new ServicioUsuarios();
    }

    obtenerCanalPorUsuario = async (idUsuario) => {
        return await this.model.obtenerCanalPorUsuario(idUsuario);
    }

    crearCanal = async (idUsuario) => {
        return await this.model.crearCanal(idUsuario);
    }

    obtenerCanales = async () => {
        return await this.model.obtenerCanales();
    }

    obtenerMensajesPorCanal = async (canalId, mostrarTodos) => {
        return await this.model.obtenerMensajesPorCanal(canalId, mostrarTodos);
    }

    guardarMensaje = async (mensaje) => {
        return await this.model.guardarMensaje(mensaje);
    }

    borrarMensaje = async (idMensaje) => {
        return await this.model.borrarMensaje(idMensaje);
    }

    marcarMensajesVistos = async (canalId, emisor) => {
        return await this.model.marcarMensajesVistos(canalId, emisor);
    }

    iniciarChatUsuario = async (usuario) => {
        const userDoc = await this.servicioUsuarios.buscarUsuarioPorNombre(usuario);
        if (!userDoc) return null;

        let canal = await this.obtenerCanalPorUsuario(userDoc._id);
        let canalNuevo = false;

        if (!canal) {
            canal = await this.crearCanal(userDoc._id);
            canalNuevo = true;
        }

        const mensajes = await this.obtenerMensajesPorCanal(canal._id, false);
        await this.marcarMensajesVistos(canal._id, 'admin');

        let canales = null;
        if (canalNuevo) {
            canales = await this.obtenerCanales();
        }

        return {
            canalId: canal._id.toString(),
            mensajes,
            canalNuevo,
            canales
        };
    }

}

export default Servicio;