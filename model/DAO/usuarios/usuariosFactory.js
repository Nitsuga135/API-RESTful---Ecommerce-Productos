import ModelMongoDB from "../usuarios/usuariosMongoDB.js"

class ModelFactory {
    static get(tipo) {
        switch (tipo) {

            case 'MONGODB':
                console.log('**** Usuarios  Persistiendo en MongoDB ****')
                return new ModelMongoDB()

            default:
                console.log('**** Usuarios Persistiendo en Memoria (default) ****')
                return new ModelMongoDB()
        }
    }
}

export default ModelFactory