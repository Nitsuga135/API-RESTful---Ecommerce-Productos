import Controller from '../controller/mensajes.js';

class Router {

    constructor(){
        this.controller = new Controller();
    }

    start(io){
        return async socket => {
            //Carga inicial de mensajes
            
            socket.emit('mensaje', await this.controller.obtenerMensajes());
            
            //escucha de mensajes nuevos de todos los clientes y los actualizo
            socket.on('nuevo-mensaje', async (data) => {
                await this.controller.guardarMensaje(data)
                io.sockets.emit('mensaje', await this.controller.obtenerMensajes());
            });

            //desconexion del cliente
            socket.on('disconnect', () => {
                console.log(`Cliente desconectado: ${socket.id}`);
            });
        }
            
        
    }
}
export default Router;
