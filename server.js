import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import path from 'path';
import { fileURLToPath } from 'url';
import config from './config/config.js';
import cors from 'cors';
import CnxMongoDB from './model/DBMongo.js';

import RouterProductos from './router/productos.js'
import RouterCarrito from './router/carrito.js'
import RouterUsuarios from './router/usuarios.js'

import RouterUpload from './router/upload.js'


// -- Configuracion del servidor --

const app = express();
const http = createServer(app);
const io = new Server(http,{
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, 'public');

app.use(cors())
app.use(express.static(publicPath));
app.use(express.urlencoded({extended: true}));
app.use(express.json());






// -- Atencion comunicacion Socket.io --
io.on('connection', (socket) => {
    //Carga inicial de mensajes
    console.log(`Nuevo cliente conectado: ${socket.id}`);
    const mensaje = [{ usuario: 'nombre', texto: 'mensaje 1' }, { usuario: 'nombre', texto: 'mensaje 2' }, { usuario: 'nombre', texto: 'mensaje 3' }];
    socket.emit('mensaje', mensaje);
    
    //escucha de mensajes nuevos de todos los clientes y los actualizo
    socket.on('nuevo-mensaje', (data) => {
        mensaje.push(data);
        io.sockets.emit('mensaje', mensaje);
    });

    //desconexion del cliente
    socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    });
});






// -- Rutas / endpoints API RESTfull --

app.use('/api/productos', new RouterProductos().start() );
app.use('/api/carrito', new RouterCarrito().start() );
app.use('/api/upload', new RouterUpload().start() );
app.use('/api/usuarios', new RouterUsuarios().start() );
app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});








// -- LISTEN DEL SERVER --
if(config.MODO_PERSISTENCIA == 'MONGODB' ){
    await CnxMongoDB.conectar();
}

const PORT = config.PORT;

const server = http.listen (PORT, () => console.log(`Servidor API RESTFULL escuchando en http://localhost:${PORT}`));
server.on('error', error => console.log( `Error en servidor: ${error.message}` ));
