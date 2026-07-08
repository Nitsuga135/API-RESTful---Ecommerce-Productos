import ModelFactory from '../model/DAO/mensajes/mensajesFactory.js';
import config from '../config/config.js';

class Servicio {
    constructor(){
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA);
    }

    obtenerCanalPorUsuario   = async (idUsuario)             => await this.model.obtenerCanalPorUsuario(idUsuario);
    crearCanal               = async (idUsuario)             => await this.model.crearCanal(idUsuario);
    obtenerCanales           = async ()                      => await this.model.obtenerCanales();
    obtenerMensajesPorCanal  = async (canalId, mostrarTodos) => await this.model.obtenerMensajesPorCanal(canalId, mostrarTodos);
    guardarMensaje           = async (mensaje)               => await this.model.guardarMensaje(mensaje);
    borrarMensaje            = async (idMensaje)             => await this.model.borrarMensaje(idMensaje);
    marcarMensajesVistos     = async (canalId, emisor)       => await this.model.marcarMensajesVistos(canalId, emisor);
}

export default Servicio;
