import { ApiResponse } from '../../entities/Response.js';
import Pacientes from '../../models/pacientes.js';
import { InternalServerException } from '../../errors/InternalServerException.js';
import { NotFoundException } from '../../errors/NotFoundException.js';
export async function EliminarPacienteByIdHandler(req) {
    const { id } = req.params;
    try {
        const paciente = await Pacientes.findOne({
            _id: id,
            veterinario: req.data._id,
        });
        if (!paciente) {
            return new NotFoundException('Paciente no encontrado');
        }
        await paciente.deleteOne();
        return new ApiResponse(200, 'Paciente eliminado');
    }
    catch (error) {
        const mongooseError = error;
        return new InternalServerException(mongooseError.message);
    }
}
