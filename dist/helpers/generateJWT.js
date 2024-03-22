import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export default function generarJWT(payload) {
    const secrets = process.env.JWT_SECRET;
    if (secrets) {
        return jwt.sign({ ...payload, expirationDate: setExpirationJwt() }, secrets, {
            expiresIn: '1d',
        });
    }
    return new Error('No JWT Secrets provided');
}
function setExpirationJwt() {
    const now = Date.now();
    const threshold = 1000 * 6;
    0 * 60 * 24;
    return new Date(now + threshold);
}
