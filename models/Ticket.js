import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true, // Código único
        required: true
    },
    purchase_datetime: {
        type: Date,
        default: Date.now // Fecha y hora actual por defecto
    },
    amount: {
        type: Number,
        required: true // Monto total de la compra
    },
    purchaser: {
        type: String,
        required: true // Correo del usuario que realizó la compra
    }
});

// Exporta el modelo Ticket
export default mongoose.model('Ticket', ticketSchema);