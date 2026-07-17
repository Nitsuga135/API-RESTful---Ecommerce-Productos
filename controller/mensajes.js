import Servicio from '../servicio/mensajes.js';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

class Controller {

    constructor() {
        this.servicio = new Servicio();
    }

    obtenerCanales = async () => {
        return await this.servicio.obtenerCanales();
    }

    iniciarChat = async (token) => {
        if (!token) return null;

        try {
            const decoded = jwt.verify(token, config.JWT_SECRET);
            const { usuario, admin } = decoded;

            if (admin) {
                const canales = await this.servicio.obtenerCanales();
                return {
                    admin: true,
                    canales
                };
            }

            const chatInfo = await this.servicio.iniciarChatUsuario(usuario);
            if (!chatInfo) return null;

            return {
                admin: false,
                ...chatInfo
            };
        } catch (err) {
            console.error("Token inválido en WebSocket:", err.message);
            return null;
        }
    }

    seleccionarCanal = async (canalId) => {
        const mensajes = await this.servicio.obtenerMensajesPorCanal(canalId, true);
        const canales = await this.servicio.obtenerCanales();
        const canal = canales.find(c => c._id.toString() === canalId);

        if (canal?.idUsuario?.usuario) {
            await this.servicio.marcarMensajesVistos(canalId, canal.idUsuario.usuario);
        }

        return mensajes;
    }

    nuevoMensaje = async (datos) => {
        const mensaje = await this.servicio.guardarMensaje({
            canal: datos.canalId,
            mensaje: datos.mensaje,
            usuario: datos.usuario,
            estado_visible: true,
            visto: false,
            fechaYHora: new Date().toISOString()
        });

        const canales = await this.servicio.obtenerCanales();
        return {
            mensaje,
            canales
        };
    }

    mensajesVistos = async (canalId, emisor) => {
        await this.servicio.marcarMensajesVistos(canalId, emisor);
    }

    borrarMensaje = async (idMensaje) => {
        return await this.servicio.borrarMensaje(idMensaje);
    }
}

export default Controller;