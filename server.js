import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import config from './config/config.js';
import cors from 'cors';
import CnxMongoDB from './model/DBMongo.js';

import RouterProductos from './router/productos.js'
import RouterCarrito from './router/carrito.js'
import RouterUpload from './router/upload.js'

// -- Rutas / endpoints API RESTfull -- 

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, 'public');

app.use(cors())
app.use(express.static(publicPath));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/productos', new RouterProductos().start() );
app.use('/api/carrito', new RouterCarrito().start() );
app.use('/api/upload', new RouterUpload().start() );
app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// -- LISTEN DEL SERVER --
if(config.MODO_PERSISTENCIA == 'MONGODB' ){
    await CnxMongoDB.conectar();
}

const PORT = config.PORT;

const server = app.listen (PORT, () => console.log(`Servidor API RESTFULL escuchando en http://localhost:${PORT}`));
server.on('error', error => console.log( `Error en servidor: ${error.message}` ));
