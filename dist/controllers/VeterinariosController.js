import { ValidateRegister } from '../validator/Veterinarios/VeterinariosRegisterValidator.js';
import { BadRequestException } from '../errors/BadRequestException.js';
import GuardarVeterinario from '../handler/veterinariosHandler/GuardarVeterinario.js';
import { ValidateConfirm } from '../validator/Veterinarios/VeterinariosConfirmValidator.js';
import { LoginValidator } from '../validator/Veterinarios/VeterinariosLoginValidator.js';
import generarJWT from '../helpers/generateJWT.js';
import { RecoverPasswordTokenValidator, RecoverPasswordValidator, SetNewPasswordValidator, } from '../validator/Veterinarios/VeterinarioRecoverPasswordValidator.js';
import Veterinario from '../models/veterinario.js';
import { VeterinarioUpdateProfileValidator } from '../validator/Veterinarios/VeterinarioUpdateProfileValidator.js';
import { VeterinarioUpdatePasswordValidator } from '../validator/Veterinarios/VeterinarioUpdatePasswordValidator.js';
async function GetVeterinarios(req, res) {
    const veterinarios = await Veterinario.find();
    res.json(veterinarios);
}
async function Registrar(req, res) {
    const r = await ValidateRegister(req);
    if (r instanceof BadRequestException) {
        console.log('Returning Bad Request');
        return res.status(r.status).json({
            status: r.status,
            message: r.message,
            name: r.name,
        });
    }
    const toSave = await GuardarVeterinario(req);
    if (toSave) {
        res.json(r);
        return;
    }
    res.status(500).json({ status: 500, message: 'Error desconocido' });
}
async function Confirmar(req, res) {
    const r = await ValidateConfirm(req);
    if (r instanceof Error) {
        console.log('Returning Bad Request');
        return res.status(r.status).json({
            status: r.status,
            message: r.message,
            name: r.name,
        });
    }
    res.status(200).json(r);
}
async function Auth(req, res) {
    const r = await LoginValidator(req);
    if (r instanceof Error) {
        res.status(r.status).json({
            status: r.status,
            message: r.message,
            name: r.name,
        });
    }
    else {
        const { data } = r;
        if (data) {
            console.log('Getting Auth credentials for ', data);
            const JwtToken = generarJWT({
                id: data.id,
                email: data.email,
            });
            if (JwtToken instanceof Error) {
                res.status(500).json({ status: 500, message: JwtToken.message });
                return;
            }
            const veterinarioDto = {
                email: data.email,
                nombre: data.nombre,
                JwtToken: {
                    token: JwtToken,
                },
            };
            res.status(r.code).json(veterinarioDto);
            return;
        }
        res.status(500).json({ status: 500, message: 'Error desconocido' });
    }
}
function PerfilVeterinarios(req, res) {
    const veterinario = req.data;
    res.json({ perfil: veterinario });
}
async function updateProfile(req, res) {
    const r = await VeterinarioUpdateProfileValidator(req);
    if (r instanceof Error) {
        res.status(r.status).json({
            status: r.status,
            message: r.message,
            name: r.name,
        });
    }
    else {
        res.status(r.code).json(r);
    }
}
async function updatePassword(req, res) {
    const r = await VeterinarioUpdatePasswordValidator(req);
    if (r instanceof Error) {
        res.status(r.status).json({
            status: r.status,
            message: r.message,
            name: r.name,
        });
    }
    else {
        res.status(r.code).json(r);
    }
}
async function recoverPassword(req, res) {
    const r = await RecoverPasswordValidator(req, res);
    if (r instanceof Error) {
        res.status(r.status).json({
            status: r.status,
            message: r.message,
            name: r.name,
        });
    }
    else {
        res.status(r.code).json(r);
    }
}
async function recoverPasswordToken(req, res) {
    const r = await RecoverPasswordTokenValidator(req);
    if (r instanceof Error) {
        res.status(r.status).json({
            status: r.status,
            message: r.message,
            name: r.name,
        });
        return;
    }
    res.status(r.code).json(r);
}
async function setNewPassword(req, res) {
    const r = await SetNewPasswordValidator(req);
    if (r instanceof Error) {
        res.status(r.status).json({
            status: r.status,
            message: r.message,
            name: r.name,
        });
        return;
    }
    res.status(r.code).json(r);
}
export { GetVeterinarios, PerfilVeterinarios, Registrar, Confirmar, Auth, recoverPassword, recoverPasswordToken, setNewPassword, updateProfile, updatePassword, };
