import { UnauthorizeException } from '../errors/UnauthorizeException.js';
import jwt from 'jsonwebtoken';
import Veterinario from '../models/veterinario.js';
import { InternalServerException } from '../errors/InternalServerException.js';
export default async function AuthenticateCheck(req, res, next) {
    console.log('Executing AuthenticateCheck');
    const authToken = req.headers.authorization;
    try {
        if (authToken && authToken.startsWith('Bearer')) {
            const JwtToken = authToken.split(' ')[1];
            console.log('Authorization Header detected; checking token...');
            try {
                if (!JwtToken) {
                    console.log('Token does not exist');
                    throw new UnauthorizeException('Fallo en la autorización del usuario');
                }
                console.log('Token detected, validating token...');
                const secrets = process.env.JWT_SECRET;
                const decoded = jwt.verify(JwtToken, secrets ?? '');
                if (!decoded) {
                    console.log('Token invalid.');
                    throw new UnauthorizeException('Fallo en la autorización del usuario');
                }
                const { id } = decoded;
                console.log('Token valid.');
                const veterinario = await Veterinario.findById(id).select('-password -token -__v -confirmado');
                if (!veterinario) {
                    console.log('Token is valid, but there is not any user associated with it');
                    throw new UnauthorizeException('Fallo en la autorización del usuario');
                }
                console.log('user authenticated ', veterinario);
                req.data = veterinario;
                next();
            }
            catch (error) {
                if (error instanceof jwt.TokenExpiredError) {
                    console.log('Token expired.');
                    throw new UnauthorizeException('La sesión ha caducado ');
                }
                if (error instanceof jwt.JsonWebTokenError) {
                    console.log('Token invalid.');
                    throw new UnauthorizeException('Error en la sesión');
                }
                console.log('Unknown error with Token.');
                throw new InternalServerException('Error desconocido con la sesión');
            }
        }
        else {
            console.log('Token inexistent or invalid');
            throw new UnauthorizeException('Fallo en la autorización del usuario');
        }
    }
    catch (error) {
        res.status(403).json(error);
    }
}
