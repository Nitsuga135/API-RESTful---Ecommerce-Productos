import cloudinary from '../config/cloudinary.js';

class Servicio { 

    constructor(){
    }

    async subirArchivoCloudinary(file){
        if (!file?.buffer) {
            throw new Error('No se recibio ningun archivo para subir');
        }

        const resultado = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'productos',
                    resource_type: 'auto'
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );

            uploadStream.end(file.buffer);
        });

        return resultado.secure_url;
    }

    guardarArchivoCloudinary = async (file) => {

        const urlFotoCloudinary = await this.subirArchivoCloudinary(file);
        return urlFotoCloudinary;

    }

}
export default Servicio; 
