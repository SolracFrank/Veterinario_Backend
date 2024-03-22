import express from 'express'
import {
	GetVeterinarios,
	PerfilVeterinarios,
	Registrar,
	Confirmar,
	Auth,
	recoverPassword,
	recoverPasswordToken,
	setNewPassword,
	updateProfile,
	updatePassword,
} from '../controllers/VeterinariosController.js'
import AuthenticateCheck from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', AuthenticateCheck, GetVeterinarios)

//public
router.post('/', Registrar)
router.get('/confirmar/:token', Confirmar)
router.post('/login', Auth)

router.post('/recover-password', recoverPassword)

router
	.route('/recover-password/:token')
	.get(recoverPasswordToken)
	.post(setNewPassword)

//private
router
	.route('/perfil')
	.get(AuthenticateCheck, PerfilVeterinarios)
	.patch(AuthenticateCheck, updateProfile)

router.route('/perfil/password').patch(AuthenticateCheck, updatePassword)

export default router
