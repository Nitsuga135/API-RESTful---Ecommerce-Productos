// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: process.env.MP_AccessToken });
//config
import config from '../config/config.js';

export const preference = new Preference(client);

