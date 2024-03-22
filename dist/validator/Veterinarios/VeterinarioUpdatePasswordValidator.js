import { InternalServerException } from '../../errors/InternalServerException.js';
import { BadRequestException } from '../../errors/BadRequestException.js';
import { ActualizarPasswordHandler } from '../../handler/pacientesHandler/ActualizarPasswordHandler.js';
import { PASSWORD_REGEX } from '../../utils/baseRegex.js';
export async function VeterinarioUpdatePasswordValidator(req) {
    const updateData = {
        password: '',
        oldPassword: '',
    };
    try {
        Object.keys(req.body).forEach(key => {
            if (key in updateData) {
                if (req.body[key]?.trim()) {
                    updateData[key] = req.body[key];
                }
            }
        });
        if (!PASSWORD_REGEX.test(updateData.password)) {
            console.log('Password is invalid');
            return new BadRequestException('La contraseña debe tener entre 6 y 20 caracteres, una minúscula, una mayúscula y un carácter especial ', 400);
        }
    }
    catch (error) {
        return new InternalServerException(error.message);
    }
    return ActualizarPasswordHandler(req, updateData);
}
