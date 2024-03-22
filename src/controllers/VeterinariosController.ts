import { Request, Response } from 'express'
import { ValidateRegister } from '../validator/Veterinarios/VeterinariosRegisterValidator.js'
import { BadRequestException } from '../errors/BadRequestException.js'
import GuardarVeterinario from '../handler/veterinariosHandler/GuardarVeterinario.js'
import { ValidateConfirm } from '../validator/Veterinarios/VeterinariosConfirmValidator.js'
import { LoginValidator } from '../validator/Veterinarios/VeterinariosLoginValidator.js'
import { VeterinarioLoginResponse } from '../entities/Dtos/VeterinarioDto.js'
import generarJWT from '../helpers/generateJWT.js'
import {
	RecoverPasswordTokenValidator,
	RecoverPasswordValidator,
	SetNewPasswordValidator,
} from '../validator/Veterinarios/VeterinarioRecoverPasswordValidator.js'
import Veterinario from '../models/veterinario.js'
import { VeterinarioUpdateProfileValidator } from '../validator/Veterinarios/VeterinarioUpdateProfileValidator.js'
import { VeterinarioUpdatePasswordValidator } from '../validator/Veterinarios/VeterinarioUpdatePasswordValidator.js'

async function GetVeterinarios(req: Request, res: Response) {
	const veterinarios = await Veterinario.find()
	res.json(veterinarios)
}

async function Registrar(req: Request, res: Response) {
	const r = await ValidateRegister(req)
	if (r instanceof BadRequestException) {
		console.log('Returning Bad Request')
		return res.status(r.status).json({
			status: r.status,
			message: r.message,
			name: r.name,
		})
	}
	const toSave = await GuardarVeterinario(req)

	if (toSave) {
		res.json(r)
		return
	}
	res.status(500).json({ status: 500, message: 'Error desconocido' })
}

async function Confirmar(req: Request, res: Response) {
	const r = await ValidateConfirm(req)
	if (r instanceof Error) {
		console.log('Returning Bad Request')
		return res.status(r.status).json({
			status: r.status,
			message: r.message,
			name: r.name,
		})
	}

	res.status(200).json(r)
}

async function Auth(req: Request, res: Response) {
	const r = await LoginValidator(req)

	if (r instanceof Error) {
		res.status(r.status).json({
			status: r.status,
			message: r.message,
			name: r.name,
		})
	} else {
		const { data } = r
		if (data) {
			console.log('Getting Auth credentials for ', data)
			const JwtToken = generarJWT({
				id: data.id,
				email: data.email,
			})

			if (JwtToken instanceof Error) {
				res.status(500).json({ status: 500, message: JwtToken.message })
				return
			}

			const veterinarioDto: VeterinarioLoginResponse = {
				email: data.email,
				nombre: data.nombre,
				JwtToken: {
					token: JwtToken,
				},
			}
			res.status(r.code).json(veterinarioDto)
			return
		}
		res.status(500).json({ status: 500, message: 'Error desconocido' })
	}
}

function PerfilVeterinarios(req: Request, res: Response) {
	const veterinario = req.data
	res.json({ perfil: veterinario })
}

async function updateProfile(req: Request, res: Response) {
	const r = await VeterinarioUpdateProfileValidator(req)
	if (r instanceof Error) {
		res.status(r.status).json({
			status: r.status,
			message: r.message,
			name: r.name,
		})
	} else {
		res.status(r.code).json(r)
	}
}

async function updatePassword(req: Request, res: Response) {
	const r = await VeterinarioUpdatePasswordValidator(req)
	if (r instanceof Error) {
		res.status(r.status).json({
			status: r.status,
			message: r.message,
			name: r.name,
		})
	} else {
		res.status(r.code).json(r)
	}
}

async function recoverPassword(req: Request, res: Response) {
	const r = await RecoverPasswordValidator(req, res)
	if (r instanceof Error) {
		res.status(r.status).json({
			status: r.status,
			message: r.message,
			name: r.name,
		})
	} else {
		res.status(r.code).json(r)
	}
}

async function recoverPasswordToken(req: Request, res: Response) {
	const r = await RecoverPasswordTokenValidator(req)
	if (r instanceof Error) {
		res.status(r.status).json({
			status: r.status,
			message: r.message,
			name: r.name,
		})
		return
	}

	res.status(r.code).json(r)
}

async function setNewPassword(req: Request, res: Response) {
	const r = await SetNewPasswordValidator(req)
	if (r instanceof Error) {
		res.status(r.status).json({
			status: r.status,
			message: r.message,
			name: r.name,
		})
		return
	}

	res.status(r.code).json(r)
}

export {
	GetVeterinarios,
	PerfilVeterinarios,
	Registrar,
	Confirmar,
	Auth,
	recoverPassword,
	recoverPasswordToken,
	setNewPassword,
	updateProfile,
	updatePassword,
}
