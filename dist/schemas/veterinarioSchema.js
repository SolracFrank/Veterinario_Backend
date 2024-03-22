import { Schema } from 'mongoose';
import generarId from '../helpers/generarId.js';
export const veterinarioSchema = new Schema({
    nombre: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    token: { type: String, default: generarId() },
    web: { type: String, default: null },
    confirmado: { type: Boolean, default: false },
});
