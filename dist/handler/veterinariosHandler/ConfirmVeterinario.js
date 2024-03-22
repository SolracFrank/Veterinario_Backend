export default async function ConfirmVeterinario(confirm) {
    try {
        if (!confirm)
            return false;
        confirm.token = '';
        confirm.confirmado = true;
        confirm.save();
        return true;
    }
    catch {
        return false;
    }
}
