import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId, // Referencia al modelo Product
                ref: 'Product', // Nombre del modelo referenciado
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1 // Cantidad por defecto
            }
        }
    ]
});

// Exporta el modelo Cart
export default mongoose.model('Cart', cartSchema);