import express from 'express';
import Controller from '../controller/usuarios.js';


class Router {

    constructor(){
        this.router = express.Router();
        this.controller = new Controller();
    }

    start(){
        
        this.router.post('/login', this.controller.loginUsuario);
        this.router.post('/register', this.controller.RegisterUsuario);
        
        return this.router;
    }
}
export default Router;