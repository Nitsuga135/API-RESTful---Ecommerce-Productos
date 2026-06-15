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
const MP_BACK_URL_BASE = process.env.MP_BACK_URL_BASE || `http://localhost:${PORT}`;

//Exportamos las variables de entorno para que puedan ser utilizadas en otros archivos
export default {
  MODO_PERSISTENCIA,
  PORT,
  STRCNX,
  BASE,
  JWT_SECRET,
  MP_AccessToken,
  MP_BACK_URL_BASE
}
