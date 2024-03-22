import { BadRequestException } from '../../errors/BadRequestException.js';
import Veterinario from '../../models/veterinario.js';
import { ApiResponse } from '../../entities/Response.js';
export async function LoginValidator(req) {
    console.log('Check auth request body is not empty');
    if (!req.body) {
        console.log('BAD REQUEST: Auth request Body empty');
        return new BadRequestException('Credenciales inválidas', 400);
    }
    const { email, password } = req.body;
    console.log('Check auth data  is not empty');
    if (!email || !password) {
        console.log('BAD REQUEST: Auth data is empty');
        return new BadRequestException('Credenciales inválidas', 400);
    }
    console.log(`Check user with email ${email} exists`);
    const validateUser = await Veterinario.findOne({
        email,
    });
    if (!validateUser) {
        console.log(`BAD REQUEST: User with ${email} does not exist`);
        return new BadRequestException('Credenciales inválidas', 400);
    }
    console.log('Check if password is correct');
    if (!(await validateUser.comprobarPassword(password))) {
        console.log('BAD REQUEST password is not correct');
        return new BadRequestException('Credenciales inválidas', 400);
    }
    console.log('Check if user is confirmed');
    if (!validateUser.confirmado) {
        console.log('BAD REQUEST user is not confirmed');
        return new BadRequestException('El usuario no está confirmado', 403);
    }
    console.log('USER AUTHENTICATED');
    return new ApiResponse(200, 'Usuario autenticado satisfactoriamente', validateUser);
}
