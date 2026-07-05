import jwt from 'jsonwebtoken';
import config from '../../config/config.js';

export const guarda = (req, res, next) => {
    const token = req.headers['access-token'];

    if (!token) {
        return res.status(401).json({
            valid: false,
            error: 'Token no proporcionado'
        });
    }

    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                valid: false,
                error: 'Token inválido'
            });
        }

        req.usuario = decoded;
        next();
    });
};