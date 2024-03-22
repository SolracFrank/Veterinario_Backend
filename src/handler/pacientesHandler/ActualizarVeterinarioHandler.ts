import { Request } from 'express'
import { ApiResponse } from '../../entities/Response.js'
import { MongooseError } from 'mongoose'
import { InternalServerException } from '../../errors/InternalServerException.js'
import Veterinario from '../../models/veterinario.js'
import IActualizarPerfilRequest from '../../interfaces/RequestInterfaces/ActualizarPerfilInterface.js'
import { NotFoundException } from '../../errors/NotFoundException.js'

export async function ActualizarVeterinarioHandler(
	req: Request,
	data: IActualizarPerfilRequest
) {
	const veterinarioId = req.data._id
	try {
		const veterinario = await Veterinario.findById(veterinarioId)
		const veterinarios = await Veterinario.find({ email: data.email })

		if (veterinario?.email != data.email) {
			if (veterinarios.length > 0) {
				console.log(veterinarios)
				return new NotFoundException('El email ya está registrado')
			}
		}
		if (!veterinario) {
			return new NotFoundException('El usuario del perfil no existe')
		}
		Object.keys(data).forEach(
			key =>
				data[key as keyof IActualizarPerfilRequest] === undefined &&
				delete data[key as keyof IActualizarPerfilRequest]
		)
		Object.assign(veterinario, data)

		const updateVeterinario = await veterinario.save()
		const updatedProfile = {
			email: updateVeterinario.email,
			nombre: updateVeterinario.nombre,
			web: updateVeterinario.web,
		}
		return new ApiResponse(200, 'Veterinario actualizado', updatedProfile)
	} catch (error) {
		const mongooseError = error as MongooseError
		return new InternalServerException(mongooseError.message)
	}
}
