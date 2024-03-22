import { InternalServerException } from '../../errors/InternalServerException.js';
import { ActualizarVeterinarioHandler } from '../../handler/pacientesHandler/ActualizarVeterinarioHandler.js';
import { BadRequestException } from '../../errors/BadRequestException.js';
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
export async function VeterinarioUpdateProfileValidator(req) {
    const updateData = {
        nombre: '',
        email: '',
        web: undefined,
    };
    console.log('actualizar', req.body);
    try {
        Object.keys(req.body).forEach(key => {
            if (key in updateData) {
                if (req.body[key]?.trim()) {
                    updateData[key] = req.body[key];
                }
            }
        });
        if (!emailRegex.test(updateData.email)) {
            console.log(updateData.email);
            console.log('Email is invalid');
            return new BadRequestException('El correo es inválido', 400);
        }
    }
    catch (error) {
        return new InternalServerException(error.message);
    }
    return ActualizarVeterinarioHandler(req, updateData);
}
