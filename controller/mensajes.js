import Servicio from '../servicio/mensajes.js';
import config from '../config/config.js';

//  -- GET INDIVIDUAL/ALL -- 

class Controller{

    constructor(){
        this.servicio = new Servicio();
    }

    obtenerCarrito = async () => {
        const mensajes = await this.servicio.obtenerMensajes();
        return mensajes 
    }

    //  -- POST -- 
    guardarMensaje = async mensaje =>{
        try{
            const mensajeGuardado = await this.servicio.guardarMensaje(mensaje);
            
            return mensajeGuardado;
        }
        catch(error){
            return {errMsg: error.message}
        }
    }

}
export default Controller;
