import Servicio from '../servicio/upload.js'


class Controller{

    constructor(){
        this.servicio = new Servicio();
    }

    recibirArchivo = async (req,res) => {
        try {
            const file = req.file;

            if (!file) {
                return res.status(400).json({ error: 'Debes enviar una imagen en el campo archivo' });
            }

            const urlFoto = await this.servicio.guardarArchivoCloudinary(file);

            res.json({ urlFoto });
        } catch (error) {
            console.error('Error al subir imagen:', error);
            res.status(500).json({ error: 'No se pudo subir la imagen en este momento' });
        }
    }

    
}
export default Controller;
