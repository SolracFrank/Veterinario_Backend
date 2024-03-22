import Veterinario from '../../models/veterinario.js';
import emailRegister from '../../utils/emailRegister.js';
export default async function GuardarVeterinario(req) {
    try {
        const { email, password, nombre } = req.body;
        const url = process.env.FRONT_URLS?.split(',')[0];
        const veterinario = new Veterinario(req.body);
        const veterinarioSave = await veterinario.save();
        if (url) {
            await emailRegister({
                email,
                nombre,
                token: veterinarioSave.token,
                url
            });
        }
        return true;
    }
    catch {
        return false;
    }
}
