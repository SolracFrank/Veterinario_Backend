import { model } from 'mongoose'
import pacientesSchema from '../schemas/pacientesSchema.js'

const Pacientes = model('Pacientes', pacientesSchema)

export default Pacientes
