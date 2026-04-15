import express from 'express';
import Controller from '../controller/carrito.js';


class Router {

    constructor(){
        this.router = express.Router();
        this.controller = new Controller();
    }

    start(){
        
        this.router.get('/', this.controller.obtenerCarrito);
        this.router.post('/', this.controller.guardarCarrito);
        return this.router;
    }
}
export default Router;