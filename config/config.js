const MODO_PERSISTENCIA = process.env.MODO_PERSISTENCIA  ||  'MEM';
const PORT = process.env.PORT || 3000;
const STRCNX = process.env.STRCNX  ||  'mongodb://127.0.0.1';
const BASE = process.env.BASE  ||  'test';
const MP_AccessToken = process.env.MP_AccessToken  ||  '';
const MP_BACK_URL_BASE = process.env.MP_BACK_URL_BASE || `http://localhost:${PORT}`;
export default {
  MODO_PERSISTENCIA,
  PORT,
  STRCNX,
  BASE,
  MP_AccessToken,
  MP_BACK_URL_BASE
}
