import mongoose, { ObjectId } from 'mongoose'

export default interface IPaciente {
	_id: ObjectId
	nombre: string
	propietario: string
	email: string
	fecha: Date
	sintomas: string
	veterinario: mongoose.Schema.Types.ObjectId
}
