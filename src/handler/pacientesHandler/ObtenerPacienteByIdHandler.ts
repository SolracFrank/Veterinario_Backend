import { Request } from 'express'
import { BadRequestException } from '../../errors/BadRequestException.js'
import { ApiResponse } from '../../entities/Response.js'
import Pacientes from '../../models/pacientes.js'
import { MongooseError } from 'mongoose'
import { InternalServerException } from '../../errors/InternalServerException.js'
import { NotFoundException } from '../../errors/NotFoundException.js'
import IPaciente from '../../interfaces/IPaciente.js'

export async function ObtenerPacienteByIHandler(req: Request) {
	const { id } = req.params
	try {
		const paciente = await Pacientes.findById(id)
		if (!paciente) {
			return new NotFoundException('Paciente no encontrado')
		}
		if (
			(paciente.veterinario as any)._id.toString() !== req.data._id.toString()
		) {
			return new NotFoundException('Paciente no encontrado')
		}
		return new ApiResponse(200, 'Paciente obtenido', paciente)
	} catch (error) {
		const mongooseError = error as MongooseError
		return new InternalServerException(mongooseError.message)
	}
}
