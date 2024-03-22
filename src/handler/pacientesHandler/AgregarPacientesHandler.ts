import { Request } from 'express'
import Pacientes from '../../models/pacientes.js'
import { InternalServerException } from '../../errors/InternalServerException.js'
import { MongooseError } from 'mongoose'
import { ApiResponse } from '../../entities/Response.js'

export default async function AgregarPacientesHandler(req: Request) {
	const paciente = new Pacientes(req.body)
	console.log('Guardando paciente ')
	const { _id } = req.data

	try {
		paciente.veterinario = _id
		const pacienteGuardado = await paciente.save()
		return new ApiResponse<typeof pacienteGuardado>(
			200,
			'Paciente agregado satisfactoriamente',
			pacienteGuardado
		)
	} catch (error) {
		const newError = error as MongooseError
		return new InternalServerException(newError.message)
	}
}
