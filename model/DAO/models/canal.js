import mongoose from "mongoose";

const canalSchema = new mongoose.Schema({
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
        required: true,
        unique: true  // Un usuario solo puede tener un canal de soporte
    },
    fechaCreacion: {
        type: String,
        default: () => new Date().toISOString()
    }
}, { versionKey: false });

export const CanalModel = mongoose.model('canal', canalSchema);
