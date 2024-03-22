import { Request } from 'express'
import { BadRequestException } from '../../errors/BadRequestException.js'
import { EliminarPacienteByIdHandler } from '../../handler/pacientesHandler/EliminarPacienteByIdHandler.js'

export async function EliminarPacienteByIdValidator(req: Request) {
	if (!req.params.id?.trim()) {
		return new BadRequestException('Id de paciente inválida', 400)
	}

	return EliminarPacienteByIdHandler(req)
}
