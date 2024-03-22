import { Request } from 'express'
import { ApiResponse } from '../../entities/Response.js'
import Pacientes from '../../models/pacientes.js'
import { MongooseError } from 'mongoose'
import { InternalServerException } from '../../errors/InternalServerException.js'
import { NotFoundException } from '../../errors/NotFoundException.js'
import IActualizarPacienteRequest from '../../interfaces/RequestInterfaces/ActualizarPacienteInterface.js'

export async function ActualizarPacienteHandler(
	req: Request,
	data: IActualizarPacienteRequest
) {
	const { id } = req.params
	const veterinarioId = req.data._id
	try {
		const paciente = await Pacientes.findOne({
			_id: id,
			veterinario: veterinarioId,
		})
		if (!paciente) {
			return new NotFoundException('Paciente no encontrado')
		}
		Object.keys(data).forEach(
			key =>
				data[key as keyof IActualizarPacienteRequest] === undefined &&
				delete data[key as keyof IActualizarPacienteRequest]
		)
		Object.assign(paciente, data)

		const updatedPaciente = await paciente.save()
		return new ApiResponse(200, 'Paciente obtenido', updatedPaciente)
	} catch (error) {
		const mongooseError = error as MongooseError
		return new InternalServerException(mongooseError.message)
	}
}
