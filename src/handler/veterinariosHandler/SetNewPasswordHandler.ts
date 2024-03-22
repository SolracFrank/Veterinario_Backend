import { Request } from 'express'
import Veterinario from '../../models/veterinario.js'
import { NotFoundException } from '../../errors/NotFoundException.js'
import { ApiResponse } from '../../entities/Response.js'
import { InternalServerException } from '../../errors/InternalServerException.js'

export default async function SetNewPasswordHandler(
	token: string,
	password: string
) {
	console.log('Getting "veterinario" with token')
	const veterinario = await Veterinario.findOne({ token })
	if (!veterinario) {
	console.log('There is not any "veterinario" with provided token')

		return new NotFoundException('Datos inválidos')
	}
	console.log('"veterinario" found with provided token')

	try {
	console.log('Setting new password and removing token')

		veterinario.token = ''
		veterinario.password = password
		await veterinario.save()
	console.log('Password has been changed and token has been removed')

		return new ApiResponse<string>(200, 'Password cambiada')
	} catch (error) {
	console.log('Unknown error')
		return new InternalServerException('Error desconocido')
	}
}
