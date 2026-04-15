import express from 'express';
import Controller from '../controller/productos.js';


class Router {

    constructor(){
        this.router = express.Router();
        this.controller = new Controller();
    }

    start(){
        
        this.router.get('/', this.controller.obtenerProductos);
        this.router.get('/:id', this.controller.obtenerProductos);
        this.router.post('/', this.controller.guardarProd);
        this.router.delete('/:id', this.controller.eliminarProd);
        this.router.put('/:id', this.controller.editarProd);

        return this.router;
    }
}
export default Router;