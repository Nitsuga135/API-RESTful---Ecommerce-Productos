class ModelMem {

    constructor() {
        this.mensajes = []
    }

    obtenerMensajes = async () => this.mensajes

    guardarMensaje = async mensajes => {
        mensajes.id = String(parseInt(this.mensajes[this.mensajes.length-1]?.id || 0) + 1)
        this.mensajes.push(mensajes)
        return mensajes
    }
}

export default ModelMem