import { BadRequestException } from '../../errors/BadRequestException.js';
import { EliminarPacienteByIdHandler } from '../../handler/pacientesHandler/EliminarPacienteByIdHandler.js';
export async function EliminarPacienteByIdValidator(req) {
    if (!req.params.id?.trim()) {
        return new BadRequestException('Id de paciente inválida', 400);
    }
    return EliminarPacienteByIdHandler(req);
}
