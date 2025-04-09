import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // El nombre es obligatorio
    },
    price: {
        type: Number,
        required: true, // El precio es obligatorio
        min: 0 // El precio no puede ser negativo
    },
    stock: {
        type: Number,
        required: true, // El stock es obligatorio
        min: 0 // El stock no puede ser negativo
    }
});

// Exporta el modelo Product
export default mongoose.model('Product', productSchema);