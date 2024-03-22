import { Request } from 'express'
import { UnauthorizeException } from '../../errors/UnauthorizeException.js'
import { ObtenerPacientesHandler } from '../../handler/pacientesHandler/ObtenerPacientesHandler.js'

export async function ObtenerPacientesValidator(req: Request) {
	console.log('Validating user exists')
	const { _id } = req.data
	if (!_id) {
		return new UnauthorizeException('El usuario no existe')
	}
	return await ObtenerPacientesHandler(req)
}
