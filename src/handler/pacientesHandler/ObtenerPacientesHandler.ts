import { Request } from 'express'
import Pacientes from '../../models/pacientes.js'
import { ApiResponse } from '../../entities/Response.js'
import { MongooseError } from 'mongoose'
import { InternalServerException } from '../../errors/InternalServerException.js'

export async function ObtenerPacientesHandler(req: Request) {
	const { _id } = req.data
	try {
		const pacientes = await Pacientes.find().where('veterinario').equals(_id)
		return new ApiResponse(200, 'Pacientes obtenidos', pacientes)
	} catch (error) {
		const newError = error as MongooseError
		return new InternalServerException(newError.message)
	}
}
