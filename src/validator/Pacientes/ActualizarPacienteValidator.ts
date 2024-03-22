import { Request } from 'express'
import { BadRequestException } from '../../errors/BadRequestException.js'
import { ActualizarPacienteHandler } from '../../handler/pacientesHandler/ActualizarPacienteHandler.js'
import IActualizarPacienteRequest from '../../interfaces/RequestInterfaces/ActualizarPacienteInterface.js'
import { InternalServerException } from '../../errors/InternalServerException.js'

export async function ActualizarPacienteValidator(req: Request) {
	if (!req.params.id?.trim()) {
		return new BadRequestException('Id de paciente inválida', 400)
	}
	const updateData: IActualizarPacienteRequest = {
		nombre: undefined,
		email: undefined,
		fecha: undefined,
		propietario: undefined,
		sintomas: undefined,
	}
	console.log('actualizar', req.body)
	try {
		Object.keys(req.body).forEach(key => {
			if (key in updateData) {
				if (req.body[key]?.trim()) {
					updateData[key as keyof IActualizarPacienteRequest] = req.body[key]
				}
			}
		})
	} catch (error) {
		return new InternalServerException((error as Error).message)
	}

	if (updateData['fecha']?.trim()) {
		const fecha = updateData['fecha']
		const fechaObj = new Date(fecha)

		if (fechaObj.toString() === 'Invalid Date') {
			console.log('formato de fecha inválida ')

			return new BadRequestException(
				'La fecha no tiene el formato correcto',
				400
			)
		}
	}

	return ActualizarPacienteHandler(req, updateData)
}
