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
            const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '5h' });

            return { status: 'ok', token, usuario, admin };
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

    validarToken = async (data) => {
        const {token} = data;
        if(token){
            try {
                const decoded = jwt.verify(token, config.JWT_SECRET);
                return { valid: true, decoded };
            }catch (error) {
                return { valid: false, error: error.message };
        }}else{
            return { valid: false, error: 'Token no proporcionado' };
        }
        
    }

    buscarUsuarioPorNombre = async (nombreUsuario) => {
        return await this.model.buscarUsuarioPorNombre(nombreUsuario);
    }
}



export default Servicio;
