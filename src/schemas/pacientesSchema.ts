import { Schema } from 'mongoose'
import IPaciente from '../interfaces/IPaciente.js'

const pacientesSchema = new Schema<IPaciente>(
	{
		nombre: { type: String, required: true, trim: true },
		email: { type: String, required: true, trim: true },
		propietario: { type: String, required: true, trim: true },
		fecha: { type: Date, required: true, default: Date.now() },
		sintomas: { type: String, required: true, trim: true },
		veterinario: { type: Schema.Types.ObjectId, required: true },
	},
	{
		timestamps: true,
	}
)

export default pacientesSchema
