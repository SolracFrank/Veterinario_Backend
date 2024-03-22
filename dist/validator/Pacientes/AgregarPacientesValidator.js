import { BadRequestException } from '../../errors/BadRequestException.js';
import AgregarPacientesHandler from '../../handler/pacientesHandler/AgregarPacientesHandler.js';
export default async function AgregarPacientesValidator(req) {
    const { nombre, propietario, sintomas, fecha } = req.body;
    const { _id } = req.data;
    console.log('Validando ID user ');
    if (!_id) {
        return new BadRequestException('El usuario no existe', 400);
    }
    console.log('User existe');
    console.log('Validando nombre, propietario, sintomas y fecha');
    console.log(req.body);
    if (!nombre?.trim() || !propietario?.trim() || !sintomas?.trim()) {
        console.log('Validando nombre, propietario o sintomas están vacíos');
        return new BadRequestException('Faltaron algunos campos por llenar', 400);
    }
    if (fecha?.trim()) {
        const fechaObj = new Date(fecha);
        if (fechaObj.toString() === 'Invalid Date') {
            console.log('formato de fecha inválida');
            return new BadRequestException('La fecha no tiene el formato correcto', 400);
        }
    }
    console.log('Datos válidos');
    return await AgregarPacientesHandler(req);
}
