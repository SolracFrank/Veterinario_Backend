import { Request, Response } from 'express'
import AgregarPacientesValidator from '../validator/Pacientes/AgregarPacientesValidator.js'
import { ObtenerPacientesValidator } from '../validator/Pacientes/ObtenerPacientesValidator.js'
import { ObtenerPacienteByIdValidator } from '../validator/Pacientes/ObtenerPacienteByIdValidator.js'
import { ActualizarPacienteValidator } from '../validator/Pacientes/ActualizarPacienteValidator.js'
import { EliminarPacienteByIdValidator } from '../validator/Pacientes/EliminarPacienteByIdValidator.js'

async function agregarPaciente(req: Request, res: Response) {
	const r = await AgregarPacientesValidator(req)

	if (r instanceof Error) {
		return res.status(r.status).json({
			status: r.status,
			message: r.message,
			name: r.name,
		})
	}

	res.status(200).json(r)
}

async function obtenerPacientes(req: Request, res: Response) {
	const r = await ObtenerPacientesValidator(req)

	if (r instanceof Error) {
		return res.status(r.status).json({
			status: r.status,
			message: r.message,
			name: r.name,
		})
	}

	res.status(200).json(r)
}

async function obtenerPacienteById(req: Request, res: Response) {
	const r = await ObtenerPacienteByIdValidator(req)

	if (r instanceof Error) {
		return res.status(r.status).json({
			status: r.status,
			message: r.message,
			name: r.name,
		})
	}

	res.status(200).json(r)
}

async function actualizarPaciente(req: Request, res: Response) {
	const r = await ActualizarPacienteValidator(req)

	if (r instanceof Error) {
		return res.status(r.status).json({
			status: r.status,
			message: r.message,
			name: r.name,
		})
	}

	res.status(200).json(r)
}

async function eliminarPaciente(req: Request, res: Response) {
	const r = await EliminarPacienteByIdValidator(req)

	if (r instanceof Error) {
		return res.status(r.status).json({
			status: r.status,
			message: r.message,
			name: r.name,
		})
	}

	res.status(200).json(r)
}
export {
	agregarPaciente,
	obtenerPacientes,
	obtenerPacienteById,
	actualizarPaciente,
	eliminarPaciente,
}
