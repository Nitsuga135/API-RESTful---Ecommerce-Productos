import Servicio from '../servicio/mensajes.js';

class Controller {
    constructor(){
        this.servicio = new Servicio();
    }

    obtenerCanalPorUsuario   = async (idUsuario)             => await this.servicio.obtenerCanalPorUsuario(idUsuario);
    crearCanal               = async (idUsuario)             => await this.servicio.crearCanal(idUsuario);
    obtenerCanales           = async ()                      => await this.servicio.obtenerCanales();
    obtenerMensajesPorCanal  = async (canalId, mostrarTodos) => await this.servicio.obtenerMensajesPorCanal(canalId, mostrarTodos);
    guardarMensaje           = async (mensaje)               => await this.servicio.guardarMensaje(mensaje);
    borrarMensaje            = async (idMensaje)             => await this.servicio.borrarMensaje(idMensaje);
    marcarMensajesVistos     = async (canalId, emisor)       => await this.servicio.marcarMensajesVistos(canalId, emisor);
}

export default Controller;
