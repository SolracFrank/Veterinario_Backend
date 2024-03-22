import { model } from 'mongoose'
import bcrypt from 'bcrypt'
import { veterinarioSchema } from '../schemas/veterinarioSchema.js'

veterinarioSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

veterinarioSchema.methods.comprobarPassword = async function (
	password: string
) {
	return await bcrypt.compare(password, this.password)
}

const Veterinario = model('Veterinario', veterinarioSchema)

export default Veterinario
