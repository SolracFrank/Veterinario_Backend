import { Schema } from 'mongoose';
const pacientesSchema = new Schema({
    nombre: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    propietario: { type: String, required: true, trim: true },
    fecha: { type: Date, required: true, default: Date.now() },
    sintomas: { type: String, required: true, trim: true },
    veterinario: { type: Schema.Types.ObjectId, required: true },
}, {
    timestamps: true,
});
export default pacientesSchema;
