import { Document, ObjectId } from 'mongoose'

export interface IVeterinario extends Document {
	_id: ObjectId
	nombre: string
	web: string
	token: string
	password: string
	email: string
	confirmado: boolean
	comprobarPassword: (password: string) => Promise<boolean>
}
