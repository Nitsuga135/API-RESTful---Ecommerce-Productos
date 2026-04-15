import express from 'express';
import Controller from '../controller/upload.js';
import uploadImagen from '../middleware/middelwareUpload/uploadImagen.js';

class Router {

    constructor(){
        this.router = express.Router();
        this.controller = new Controller();
    }

    start(){
        this.router.post(
            '/',
            uploadImagen,
            this.controller.recibirArchivo
        );
        return this.router;
    }
}
export default Router;
