//Modos de persistencia: MEM, FILE, MONGO, FIREBASE
const MODO_PERSISTENCIA = process.env.MODO_PERSISTENCIA  ||  'MEM';

//Puerto
const PORT = process.env.PORT || 3000;

//Secret para JWT
const JWT_SECRET = process.env.JWT_SECRET

//Conexion a MongoDB
const STRCNX = process.env.STRCNX  ||  'mongodb://127.0.0.1';
const BASE = process.env.BASE  ||  'test';

//Mercado Pago
const MP_AccessToken = process.env.MP_AccessToken  ||  '';
const FRONTEND_URL = process.env.FRONTEND_URL || `http://localhost:${PORT}`;
const MERCADO_PAGO_CALLBACK_URL = FRONTEND_URL.includes('localhost')
  ? 'https://api-restful-ecommerce-productos.onrender.com'
  : FRONTEND_URL;

//Exportamos las variables de entorno para que puedan ser utilizadas en otros archivos
export default {
  MODO_PERSISTENCIA,
  PORT,
  STRCNX,
  BASE,
  JWT_SECRET,
  MP_AccessToken,
  FRONTEND_URL,
  MERCADO_PAGO_CALLBACK_URL
}
