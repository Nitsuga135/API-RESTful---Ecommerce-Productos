import ModelFactory from '../model/DAO/usuarios/usuariosFactory.js';
import config from '../config/config.js';
import validar from './validaciones/productos.js';

class Servicio { 

    constructor(){
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA);
    }

        //  -- GET INDIVIDUAL/all -- 
    loginUsuario = async credenciales => {
        const usuario = await this.model.loginUsuario()
        return {status: usuario};      
    }

    //  -- POST -- 
    guardarUsuario = async (usuario) =>{
        const error = validar(usuario);

        if(!error){
            const usuarioRegistrado = await this.model.guardarUsuario(usuario);
            return usuarioRegistrado;
        }else{
            throw new Error (error.details[0].message)
        }
        
    }
    
   /*  //  -- PUT --
    actualizarUsuario = async (id, usuario) =>{
        const usuarioActualizado = await this.model.actualizarUsuario(id, usuario);
        return usuarioActualizado;
    }

    //  -- DELETE --
    borrarUsuario = async (id) =>{
    const usuarioEliminado = await this.model.borrarUsuario(id);
    return usuarioEliminado;
    }
 */
}



export default Servicio;
