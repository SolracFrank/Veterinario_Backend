import { Request } from 'express'
import { BadRequestException } from '../../errors/BadRequestException.js'
import { ApiResponse } from '../../entities/Response.js'
import Pacientes from '../../models/pacientes.js'
import { MongooseError } from 'mongoose'
import { InternalServerException } from '../../errors/InternalServerException.js'
import { NotFoundException } from '../../errors/NotFoundException.js'

export async function EliminarPacienteByIdHandler(req: Request) {
	const { id } = req.params
	try {
		const paciente = await Pacientes.findOne({
			_id: id,
			veterinario: req.data._id,
		})
		if (!paciente) {
			return new NotFoundException('Paciente no encontrado')
		}
		await paciente.deleteOne()

		return new ApiResponse(200, 'Paciente eliminado')
	} catch (error) {
		const mongooseError = error as MongooseError
		return new InternalServerException(mongooseError.message)
	}
}
