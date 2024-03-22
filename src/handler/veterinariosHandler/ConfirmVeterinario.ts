import Veterinario from '../../models/veterinario.js'
import { IVeterinario } from '../../interfaces/IVeterinario.js'

export default async function ConfirmVeterinario(
	confirm: IVeterinario | null
): Promise<boolean> {
	try {
		if (!confirm) return false

		confirm.token = ''
		confirm.confirmado = true
		confirm.save()
		return true
	} catch {
		return false
	}
}
