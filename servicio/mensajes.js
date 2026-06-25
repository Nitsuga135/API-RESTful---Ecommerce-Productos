import ModelFactory from '../model/DAO/mensajes/mensajesFactory.js';
import config from '../config/config.js';

class Servicio { 

    constructor(){
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA);
    }

        //  -- GET INDIVIDUAL/all -- 
    obtenerMensajes = async _=> {
       
        const mensajes = await this.model.obtenerMensajes()
        return mensajes
    
    }

    //  -- POST -- 
    guardarMensaje = async mensaje => {
        const mensajeGuardado = await this.model.guardarMensaje(mensaje)
        return mensajeGuardado
    }


}
export default Servicio; 
