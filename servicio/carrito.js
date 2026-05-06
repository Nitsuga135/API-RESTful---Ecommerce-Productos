import ModelFactory from '../model/DAO/carrito/carritoFactory.js';
import config from '../config/config.js';
import { preference } from './pago.js';

preference.create({
  body: {
    items: [
      {
        title: 'Mi producto',
        quantity: 1,
        unit_price: 2001
      }
    ],
      back_urls: {
        success: `http://localhost:${config.PORT}/api/carrito/mp/feedback`,
        failure: `http://localhost:${config.PORT}/api/carrito/mp/feedback`,
        pending: `http://localhost:${config.PORT}/api/carrito/mp/feedback`
      },

      auto_return: "approved",
  }
})
.then(console.log)
.catch(console.log)

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

}
export default Servicio; 
