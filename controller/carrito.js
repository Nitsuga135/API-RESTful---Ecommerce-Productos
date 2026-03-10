import Servicio from '../servicio/carrito.js';

//  -- GET INDIVIDUAL/ALL -- 

class Controller{

    constructor(){
        this.servicio = new Servicio();
    }

    obtenerCarrito = async (req,res) => {
        const carrito = await this.servicio.obtenerCarrito();
        res.json(carrito)
    }

    //  -- POST -- 
    guardarCarrito = async (req, res) =>{
        try{
            const carrito = req.body;
            const carritoGuardado = await this.servicio.guardarCarrito(carrito);
            
            res.json(carritoGuardado);
        }
        catch(error){
            res.json({errMsg: error.message})
        }
    }
}
export default Controller;