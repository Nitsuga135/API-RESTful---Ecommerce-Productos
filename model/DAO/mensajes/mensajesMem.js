class ModelMem {
    constructor() {
        this.canales = [];
        this.mensajes = [];
        this._nextId = 1;
    }

    obtenerCanalPorUsuario = async (idUsuario) =>
        this.canales.find(c => c.idUsuario === idUsuario) || null;

    crearCanal = async (idUsuario) => {
        const canal = {
            _id: String(this._nextId++),
            idUsuario,
            fechaCreacion: new Date().toISOString()
        };
        this.canales.push(canal);
        return canal;
    }

    obtenerCanales = async () => this.canales;

    // mostrarTodos=false → solo visibles (cliente)
    // mostrarTodos=true  → todos (admin)
    obtenerMensajesPorCanal = async (canalId, mostrarTodos = false) =>
        this.mensajes.filter(m =>
            m.canal === canalId && (mostrarTodos || m.estado_visible !== false)
        );

    guardarMensaje = async (mensajeData) => {
        const mensaje = {
            _id: String(this._nextId++),
            fechaYHora: new Date().toISOString(),
            estado_visible: true,
            visto: false,
            ...mensajeData
        };
        this.mensajes.push(mensaje);
        return mensaje;
    }

    borrarMensaje = async (idMensaje) => {
        const msg = this.mensajes.find(m => m._id === idMensaje);
        if (msg) msg.estado_visible = false;
        return msg || null;
    }

    marcarMensajesVistos = async (canalId, emisorAMarcar) => {
        this.mensajes
            .filter(m => m.canal === canalId && m.usuario === emisorAMarcar && !m.visto)
            .forEach(m => { m.visto = true; });
    }
}

export default ModelMem;