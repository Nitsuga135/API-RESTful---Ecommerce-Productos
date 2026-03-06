import Servicio from '../servicio/productos.js';

//  -- GET INDIVIDUAL/ALL -- 

class Controller{

    constructor(){
        this.servicio = new Servicio();
    }

    obtenerProductos = async (req,res) => {
        const {id} = req.params
        const productos = await this.servicio.obtenerProductos(id)
        res.json(productos)
    }

    //  -- POST -- 
    guardarProd = async (req, res) =>{
        try{
            const {body : producto} = req;
            const productoGuardado = await this.servicio.guardarProducto(producto);
            
            res.json(productoGuardado);
        }
        catch(error){
            res.json({errMsg: error.message})
        }
    }

    //  -- DELETE --
    eliminarProd = async (req, res) => {
    try {

        const { id } = req.params;

        const productoEliminado = await this.servicio.borrarProducto(id);

        if (!productoEliminado) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.status(200).json(productoEliminado);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
};

    //  -- PUT -- 
    editarProd = async (req, res) => {

        const { id } = req.params;
        const producto = req.body;
        
        const productoActualizado = await this.servicio.actualizarProducto(id, producto);
        
        res.json(productoActualizado);
    
    }
}
export default Controller;