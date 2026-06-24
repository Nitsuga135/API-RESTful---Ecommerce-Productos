import Controller from '../controller/mensajes.js';


const mensaje = [];
class Router {

    constructor(){
        this.controller = new Controller();
    }

    start(io){
        return socket => {
            //Carga inicial de mensajes
            
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
        }
            
        
    }
}
export default Router;