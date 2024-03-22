import { ApiResponse } from '../../entities/Response.js';
import { InternalServerException } from '../../errors/InternalServerException.js';
import Veterinario from '../../models/veterinario.js';
import { NotFoundException } from '../../errors/NotFoundException.js';
import { BadRequestException } from '../../errors/BadRequestException.js';
export async function ActualizarPasswordHandler(req, data) {
    const veterinarioId = req.data._id;
    try {
        const veterinario = await Veterinario.findById(veterinarioId);
        if (!veterinario) {
            return new NotFoundException('El usuario del perfil no existe');
        }
        if (!(await veterinario.comprobarPassword(data.oldPassword))) {
            console.log('Old password does not match');
            return new BadRequestException('La contraseña vieja no coincide', 404);
        }
        veterinario.password = data.password;
        await veterinario.save();
        return new ApiResponse(200, 'Contraseña actualizada correctamente');
    }
    catch (error) {
        const mongooseError = error;
        return new InternalServerException(mongooseError.message);
    }
}
