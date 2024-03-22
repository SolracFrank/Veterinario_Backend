import { ApiResponse } from '../../entities/Response.js';
import Pacientes from '../../models/pacientes.js';
import { InternalServerException } from '../../errors/InternalServerException.js';
import { NotFoundException } from '../../errors/NotFoundException.js';
export async function ActualizarPacienteHandler(req, data) {
    const { id } = req.params;
    const veterinarioId = req.data._id;
    try {
        const paciente = await Pacientes.findOne({
            _id: id,
            veterinario: veterinarioId,
        });
        if (!paciente) {
            return new NotFoundException('Paciente no encontrado');
        }
        Object.keys(data).forEach(key => data[key] === undefined &&
            delete data[key]);
        Object.assign(paciente, data);
        const updatedPaciente = await paciente.save();
        return new ApiResponse(200, 'Paciente obtenido', updatedPaciente);
    }
    catch (error) {
        const mongooseError = error;
        return new InternalServerException(mongooseError.message);
    }
}
