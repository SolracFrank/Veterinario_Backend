import Pacientes from '../../models/pacientes.js';
import { ApiResponse } from '../../entities/Response.js';
import { InternalServerException } from '../../errors/InternalServerException.js';
export async function ObtenerPacientesHandler(req) {
    const { _id } = req.data;
    try {
        const pacientes = await Pacientes.find().where('veterinario').equals(_id);
        return new ApiResponse(200, 'Pacientes obtenidos', pacientes);
    }
    catch (error) {
        const newError = error;
        return new InternalServerException(newError.message);
    }
}
