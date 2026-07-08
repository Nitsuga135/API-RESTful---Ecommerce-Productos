import Controller from '../controller/mensajes.js';
import { UsuarioModel } from '../model/DAO/models/usuario.js';

class Router {
    constructor(){
        this.controller = new Controller();
    }

    start(io){
        return async socket => {
            console.log(`Socket conectado: ${socket.id}`);

            // ── 1. INICIAR CHAT ──────────────────────────────────────────────
            // El cliente/admin se identifica al conectarse al chat
            socket.on('iniciar-chat', async ({ usuario, admin }) => {
                try {
                    if (admin) {
                        // El admin entra a la sala global de admins
                        socket.join('admins');
                        const canales = await this.controller.obtenerCanales();
                        socket.emit('lista-canales', canales);

                    } else {
                        // Buscar el usuario en la BD para obtener su _id
                        const userDoc = await UsuarioModel.findOne({ usuario });
                        if (!userDoc) return;

                        // Buscar o crear el canal del usuario
                        let canal = await this.controller.obtenerCanalPorUsuario(userDoc._id);
                        if (!canal) {
                            canal = await this.controller.crearCanal(userDoc._id);
                            // Notificar al admin que hay un canal nuevo
                            const canalesActualizados = await this.controller.obtenerCanales();
                            io.to('admins').emit('lista-canales', canalesActualizados);
                        }

                        const canalId = canal._id.toString();
                        socket.join(canalId);

                        // Traer solo los mensajes visibles para el cliente
                        const mensajes = await this.controller.obtenerMensajesPorCanal(canalId, false);
                        socket.emit('mensajes-canal', { canalId, mensajes });

                        // Marcar como vistos los mensajes que el admin le envió al cliente
                        await this.controller.marcarMensajesVistos(canalId, 'admin');
                    }
                } catch (err) {
                    console.error("Error en iniciar-chat:", err);
                }
            });

            // ── 2. ADMIN SELECCIONA UN CANAL ────────────────────────────────
            // El admin hace clic en un usuario de la lista lateral
            socket.on('seleccionar-canal', async (canalId) => {
                try {
                    socket.join(canalId);
                    // El admin ve todos los mensajes, incluyendo los borrados
                    const mensajes = await this.controller.obtenerMensajesPorCanal(canalId, true);
                    socket.emit('mensajes-canal', { canalId, mensajes });

                    // Marcar como vistos los mensajes del cliente que el admin aún no leyó
                    const canales = await this.controller.obtenerCanales();
                    const canal = canales.find(c => c._id.toString() === canalId);
                    if (canal?.idUsuario?.usuario) {
                        await this.controller.marcarMensajesVistos(canalId, canal.idUsuario.usuario);
                        // Notificar a la sala para que el cliente actualice sus indicadores de visto
                        io.to(canalId).emit('mensajes-actualizados-visto', canalId);
                    }
                } catch (err) {
                    console.error("Error en seleccionar-canal:", err);
                }
            });

            // ── 3. NUEVO MENSAJE ────────────────────────────────────────────
            socket.on('nuevo-mensaje', async ({ canalId, mensaje, usuario }) => {
                try {
                    const nuevoMensaje = await this.controller.guardarMensaje({
                        canal: canalId,
                        mensaje,
                        usuario,
                        estado_visible: true,
                        visto: false,
                        fechaYHora: new Date().toISOString()
                    });
                    // Emitir solo a la sala del canal (usuario + admin en esa sala)
                    io.to(canalId).emit('nuevo-mensaje', nuevoMensaje);

                    // Refrescar lista de canales del admin (actividad reciente)
                    const canalesActualizados = await this.controller.obtenerCanales();
                    io.to('admins').emit('lista-canales', canalesActualizados);

                } catch (err) {
                    console.error("Error guardando mensaje:", err);
                }
            });

            // ── 4. CLIENTE MARCA MENSAJES COMO VISTOS ───────────────────────
            // El cliente avisa que leyó los mensajes del admin
            socket.on('mensajes-vistos', async ({ canalId, emisorAMarcar }) => {
                try {
                    await this.controller.marcarMensajesVistos(canalId, emisorAMarcar);
                    // Notificar al admin que sus mensajes fueron vistos
                    io.to(canalId).emit('mensajes-actualizados-visto', canalId);
                } catch (err) {
                    console.error("Error en mensajes-vistos:", err);
                }
            });

            // ── 5. ADMIN BORRA UN MENSAJE ───────────────────────────────────
            socket.on('borrar-mensaje', async (idMensaje) => {
                try {
                    const mensajeActualizado = await this.controller.borrarMensaje(idMensaje);
                    if (mensajeActualizado) {
                        const canalId = mensajeActualizado.canal.toString();
                        // Notificar a la sala: cliente lo filtra silenciosamente, admin lo marca como eliminado
                        io.to(canalId).emit('mensaje-borrado', { idMensaje, canalId });
                    }
                } catch (err) {
                    console.error("Error al borrar mensaje:", err);
                }
            });

            socket.on('disconnect', () => {
                console.log(`Socket desconectado: ${socket.id}`);
            });
        };
    }
}

export default Router;
