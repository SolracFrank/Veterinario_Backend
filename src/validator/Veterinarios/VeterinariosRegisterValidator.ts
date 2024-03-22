import { Request } from 'express'
import { ApiResponse } from '../../entities/Response.js'
import { BadRequestException } from '../../errors/BadRequestException.js'
import Veterinario from '../../models/veterinario.js'
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../utils/baseRegex.js'

export async function ValidateRegister(req: Request) {
	const { email, password, nombre } = req.body

	console.log('Check is user exist already')
	const exists = await Veterinario.findOne({ email })

	if (exists) {
		console.log(`User ${nombre} with email ${email} already exists`)

		return new BadRequestException('El correo ya está registrado', 400)
	}
	console.log('User does not exist')

	console.log('Validating register request')

	if (!req.body) {
		console.log('register request is null')

		return new BadRequestException('Datos vacíos', 400)
	}

	console.log('Validating register fields')
	if (!email || !password || !nombre) {
		console.log('Credentials are empty')
		return new BadRequestException('Datos vacíos', 400)
	}
	console.log('data exists')

	console.log('Validating email')
	if (!EMAIL_REGEX.test(email)) {
		console.log('Email is invalid')
		return new BadRequestException('El correo es inválido', 400)
	}
	console.log('Email valid')
	console.log('Validating password')

	if (!PASSWORD_REGEX.test(password)) {
		console.log('Password is invalid')
		return new BadRequestException(
			'La contraseña debe tener entre 6 y 20 caracteres, una minúscula, una mayúscula y un carácter especial ',
			400
		)
	}
	console.log('Password valid')

	console.log('returning response')

	return new ApiResponse<string>(
		200,
		'Veterinario registrado correctamente',
		nombre
	)
}
