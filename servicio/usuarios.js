import ModelFactory from '../model/DAO/usuarios/usuariosFactory.js';
import config from '../config/config.js';
import validar from './validaciones/usuarios.js';
import jwt from 'jsonwebtoken';

class Servicio { 

    constructor(){
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA);
    }

        //  -- GET INDIVIDUAL/all -- 
    loginUsuario = async credenciales => {
        const usuario = await this.model.loginUsuario()
        
        const usuarioEncontrado = usuario.filter( c=> c.usuario === credenciales.usuario && c.password === credenciales.password);

        if(usuarioEncontrado.length === 1){
            const usuario = usuarioEncontrado[0].usuario;
            const admin = usuarioEncontrado[0].admin;

            const payload = {
                usuario,
                admin
            }
            const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1h' });

            return { status: 'ok', token};
        }else{
            return {status: "Usuario o contraseña incorrectos"};
        }
      

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
