import { Request, Response } from 'express'
import { BadRequestException } from '../../errors/BadRequestException.js'
import Veterinario from '../../models/veterinario.js'
import { NotFoundException } from '../../errors/NotFoundException.js'
import generarId from '../../helpers/generarId.js'
import { ApiResponse } from '../../entities/Response.js'
import { InternalServerException } from '../../errors/InternalServerException.js'
import SetNewPasswordHandler from '../../handler/veterinariosHandler/SetNewPasswordHandler.js'
import forgetPasswordEmail from '../../utils/emailForgetPassword.js'

export async function RecoverPasswordValidator(req: Request, res: Response) {
	const { email } = req.body
	const url = process.env.FRONT_URLS?.split(',')[0]
	if(!url)
	{
		throw new Error('Error desconocido')
	}
	if (!email) {
		return new BadRequestException('El Email es obligatorio', 400)
	}

	const existe = await Veterinario.findOne({ email })

	if (!existe) {
		return new NotFoundException('El usuario no existe')
	}
	try {
		existe.token = generarId()
		await existe.save()
		
		forgetPasswordEmail({email:email, url, token: existe.token, nombre: existe.nombre    })
		return new ApiResponse<string>(
			200,
			'Se ha enviado un email con las instrucciones'
		)
	} catch (error) {
		return new InternalServerException((error as Error).message)
	}
}

export async function RecoverPasswordTokenValidator(
	req: Request
) {
	console.log('Initializing recovering password process')
	const { token } = req.params

	console.log('Verifying token existence')
	if (!token.trim()) {
	console.log('Token is empty')
		return new BadRequestException('Token vacío', 400)
	}
	console.log('Verifying token validation')
	const tokenValido = await Veterinario.findOne({ token })

	if (tokenValido) {
	console.log('Token is valid')
		return new ApiResponse<string>(200, 'Token válido')
	} else {
	console.log('Token is invalid')
		return new BadRequestException('Token no válido', 400)
	}
}

export async function SetNewPasswordValidator(req: Request) {
	console.log('Initializing setting new password process')

	const { token } = req.params
	const { password } = req.body
	console.log('Validating request password')
	
	if (!password) {
		console.log('Password is invalid')  
		return new BadRequestException('Contraseña obligatoria', 400)
	}
	console.log('Password is valid')  

	console.log('Verifying token existence')


	if (!token.trim() || !password.trim()) {
		console.log('Token does not exist')
		return new BadRequestException('Datos inválidos', 400)
	}
	console.log('Token exist')

	return await SetNewPasswordHandler(token, password)
}
