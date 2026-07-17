import Controller from '../controller/mensajes.js';

class Router {

    constructor() {
        this.controller = new Controller();
    }

    start(io) {

        return socket => {

            socket.on('iniciar-chat', async ({ token }) => {

                const respuesta = await this.controller.iniciarChat(token);

                if (!respuesta) return;

                if (respuesta.admin) {

                    socket.join('admins');

                    socket.emit(
                        'lista-canales',
                        respuesta.canales
                    );

                    return;
                }

                socket.join(respuesta.canalId);

                socket.emit(
                    'mensajes-canal',
                    {
                        canalId: respuesta.canalId,
                        mensajes: respuesta.mensajes
                    }
                );

                if (respuesta.canalNuevo) {

                    io.to('admins').emit(
                        'lista-canales',
                        respuesta.canales
                    );

                }

            });

            socket.on('seleccionar-canal', async (canalId) => {

                socket.join(canalId);

                const mensajes = await this.controller.seleccionarCanal(canalId);

                socket.emit(
                    'mensajes-canal',
                    {
                        canalId,
                        mensajes
                    }
                );

                io.to(canalId).emit(
                    'mensajes-actualizados-visto'
                );

            });

            socket.on('nuevo-mensaje', async (datos) => {

                const resultado = await this.controller.nuevoMensaje(datos);

                io.to(datos.canalId).emit(
                    'nuevo-mensaje',
                    resultado.mensaje
                );

                io.to('admins').emit(
                    'lista-canales',
                    resultado.canales
                );

            });

            socket.on('mensajes-vistos', async ({ canalId, emisorAMarcar }) => {

                await this.controller.mensajesVistos(
                    canalId,
                    emisorAMarcar
                );

                io.to(canalId).emit(
                    'mensajes-actualizados-visto'
                );

            });

            socket.on('borrar-mensaje', async (idMensaje) => {

                const mensaje = await this.controller.borrarMensaje(idMensaje);

                if (!mensaje) return;

                io.to(
                    mensaje.canal.toString()
                ).emit(
                    'mensaje-borrado',
                    {
                        idMensaje,
                        canalId: mensaje.canal.toString()
                    }
                );

            });

            socket.on('disconnect', () => {
                console.log(`Socket desconectado: ${socket.id}`);
            });

        };

    }

}

export default Router;