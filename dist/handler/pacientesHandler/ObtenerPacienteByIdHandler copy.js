import { ApiResponse } from '../../entities/Response.js';
import Pacientes from '../../models/pacientes.js';
import { InternalServerException } from '../../errors/InternalServerException.js';
import { NotFoundException } from '../../errors/NotFoundException.js';
export async function ObtenerPacienteByIHandler(req) {
    const { id } = req.params;
    try {
        const paciente = await Pacientes.findById(id);
        if (!paciente) {
            return new NotFoundException('Paciente no encontrado');
        }
        if (paciente.veterinario._id.toString() !== req.data._id.toString()) {
            return new NotFoundException('Paciente no encontrado');
        }
        return new ApiResponse(200, 'Paciente obtenido', paciente);
    }
    catch (error) {
        const mongooseError = error;
        return new InternalServerException(mongooseError.message);
    }
}
