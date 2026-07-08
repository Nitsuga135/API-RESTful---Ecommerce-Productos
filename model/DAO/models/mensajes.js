import mongoose from "mongoose";

const mensajesSchema = new mongoose.Schema({
    canal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'canal',
        required: true
    },
    mensaje: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required: true  // Nombre del emisor del mensaje
    },
    estado_visible: {
        type: Boolean,
        default: true   // false = borrado por admin, invisible para el cliente
    },
    visto: {
        type: Boolean,
        default: false  // true = el destinatario lo leyó
    },
    fechaYHora: {
        type: String,
        default: () => new Date().toISOString()
    }
}, { versionKey: false });

export const MensajesModel = mongoose.model('mensajes', mensajesSchema);
