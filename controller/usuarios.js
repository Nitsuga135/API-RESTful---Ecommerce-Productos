import Servicio from '../servicio/usuarios.js';

//  -- GET INDIVIDUAL/ALL -- 

class Controller{

    constructor(){
        this.servicio = new Servicio();
    }

    loginUsuario = async (req,res) => {
        try{
            const credenciales = req.body;
            const usuarioLogueado = await this.servicio.loginUsuario(credenciales);
            res.json(usuarioLogueado);
        }
        catch(error){
            res.json({errMsg: error.message})
        }
    }

    //  -- POST -- 
    RegisterUsuario = async (req, res) =>{
        try{
            const credenciales = req.body;
            const usuarioRegistrado = await this.servicio.guardarUsuario(credenciales);
            res.json(usuarioRegistrado);
        }
        catch(error){
            res.json({errMsg: error.message})
        }
    }

    /* //  -- DELETE --
    eliminarProd = async (req, res) => {
    try {

        const { id } = req.params;

        const usuarioEliminado = await this.servicio.borrarUsuario(id);

        if (!usuarioEliminado) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json(usuarioEliminado);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
};

    //  -- PUT -- 
    editarUsuario = async (req, res) => {

        const { id } = req.params;
        const usuario = req.body;
        
        const usuarioActualizado = await this.servicio.actualizarUsuario(id, usuario);
        
        res.json(usuarioActualizado);
    
    } */
}
export default Controller;
