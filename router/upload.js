import express from 'express';
import Controller from '../controller/upload.js';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
    const nombre = file.originalname.replace(/\s+/g, '_');
    cb(null, Date.now() + '_' + nombre);
    }
})

const upload = multer({ storage: storage })

class Router {

    constructor(){
        this.router = express.Router();
        this.controller = new Controller();
    }

    start(){
        
        this.router.post('/', upload.single('archivo'), this.controller.recibirArchivo);
        return this.router;
    }
}
export default Router;