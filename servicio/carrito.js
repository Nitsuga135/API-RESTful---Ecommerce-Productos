import ModelFactory from '../model/DAO/carrito/carritoFactory.js';
import config from '../config/config.js';
import { preference } from './pago.js';

class Servicio { 

    constructor(){
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA);
    }

        //  -- GET INDIVIDUAL/all -- 
    obtenerCarrito = async _=> {
       
        const carrito = await this.model.obtenerCarrito()
        return carrito
    
    }

    //  -- POST -- 
      guardarCarrito = async carrito => {
        const carritoGuardado = await this.model.guardarCarrito(carrito)
        return carritoGuardado
    }


    // -- MP Preference --
    create_preference = async data => {
        const items = (data?.items || []).map(item => ({
            id: String(item.id),
            title: item.title,
            quantity: Number(item.quantity),
            unit_price: Number(item.unit_price),
            currency_id: item.currency_id || 'ARS',
            picture_url: item.picture_url || undefined
        }));

        if (items.length === 0) {
            throw new Error('No se recibieron productos para crear la preferencia');
        }

        try{
            const baseUrl = config.MERCADO_PAGO_CALLBACK_URL;
            const response = await preference.create({
                body: {
                    items,
                    back_urls: {
                        success: `${baseUrl}/api/carrito/mp/feedback`,
                        failure: `${baseUrl}/api/carrito/mp/feedback`,
                        pending: `${baseUrl}/api/carrito/mp/feedback`
                    },
                    auto_return: 'approved'
                },
            });

            return response;
        }catch(error){
            console.error('Error al crear la preferencia de pago:', error);
            throw new Error('No se pudo crear la preferencia de pago');
        }
    }

}
export default Servicio; 
