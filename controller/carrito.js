import Servicio from '../servicio/carrito.js';
import config from '../config/config.js';

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

    feedback = async (req, res) => {
        //const info = req.query;
        //console.log(info);

        const { payment_id, status, merchant_order_id } = req.query;

        res.redirect(`${config.FRONTEND_URL}/carrito?payment_id=${payment_id}&status=${status}&merchant_order_id=${merchant_order_id}`);
    }
    
    create_preference = async (req, res) => {
        try {
            const preference = await this.servicio.create_preference(req.body);
            res.json({ preferenceId: preference.id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
export default Controller;
