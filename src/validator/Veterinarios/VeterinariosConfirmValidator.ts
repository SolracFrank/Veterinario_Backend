import { Request } from 'express'
import { ApiResponse } from '../../entities/Response.js'
import { BadRequestException } from '../../errors/BadRequestException.js'
import Veterinario from '../../models/veterinario.js'
import { NotFoundException } from '../../errors/NotFoundException.js'
import { IVeterinario } from '../../interfaces/IVeterinario.js'
import ConfirmVeterinario from '../../handler/veterinariosHandler/ConfirmVeterinario.js'
import { InternalServerException } from '../../errors/InternalServerException.js'

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

export async function ValidateConfirm(req: Request) {
	console.log('Validating confirm request')

	if (!req.params.token.trim()) {
		console.log('confirm request is null')

		return new BadRequestException('Token vacío', 400)
	}

	const { token } = req.params
	const confirmUser: IVeterinario | null = await Veterinario.findOne({ token })
	console.log('Check if token exists')

	if (!confirmUser) {
		console.log(`There is not user with Token ${token} registered`)
		return new NotFoundException('Token de confirmación inválido')
	}
	console.log('Token exist')
	console.log('Trying to validate user')

	const r = await ConfirmVeterinario(confirmUser)
	if (r) {
		console.log('User confirmed successfully')

		return new ApiResponse<string>(200, 'Veterinario confirmado', 'Exitoso')
	}
	console.log('Something went wrong')
	return new InternalServerException('Algo salió mal')
}
