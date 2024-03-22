import express from 'express';
import { agregarPaciente, obtenerPacientes, obtenerPacienteById, eliminarPaciente, actualizarPaciente, } from '../controllers/PacientesController.js';
import AuthenticateCheck from '../middleware/authMiddleware.js';
const router = express.Router();
router
    .route('/')
    .post(AuthenticateCheck, agregarPaciente)
    .get(AuthenticateCheck, obtenerPacientes);
router
    .route('/:id')
    .get(AuthenticateCheck, obtenerPacienteById)
    .patch(AuthenticateCheck, actualizarPaciente)
    .delete(AuthenticateCheck, eliminarPaciente);
export default router;
