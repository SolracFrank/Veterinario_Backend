import Pacientes from '../../models/pacientes.js';
import { InternalServerException } from '../../errors/InternalServerException.js';
import { ApiResponse } from '../../entities/Response.js';
export default async function AgregarPacientesHandler(req) {
    const paciente = new Pacientes(req.body);
    console.log('Guardando paciente ');
    const { _id } = req.data;
    try {
        paciente.veterinario = _id;
        const pacienteGuardado = await paciente.save();
        return new ApiResponse(200, 'Paciente agregado satisfactoriamente', pacienteGuardado);
    }
    catch (error) {
        const newError = error;
        return new InternalServerException(newError.message);
    }
}
