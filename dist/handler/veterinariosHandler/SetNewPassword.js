import Veterinario from '../../models/veterinario.js';
import { NotFoundException } from '../../errors/NotFoundException.js';
import { ApiResponse } from '../../entities/Response.js';
export default async function SetNewPasswordHandler(token) {
    const veterinario = await Veterinario.findOne({ token });
    if (!veterinario) {
        return new NotFoundException('Datos inválidos');
    }
    return new ApiResponse(200, 'Password cambiada');
}
