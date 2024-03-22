import { BadRequestException } from '../../errors/BadRequestException.js';
import { ObtenerPacienteByIHandler } from '../../handler/pacientesHandler/ObtenerPacienteByIdHandler.js';
export async function ObtenerPacienteByIdValidator(req) {
    if (!req.params.id?.trim()) {
        return new BadRequestException('Id de paciente inválida', 400);
    }
    return ObtenerPacienteByIHandler(req);
}
