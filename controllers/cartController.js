import Cart from '../models/Cart.js';
import Ticket from '../models/Ticket.js';
import Product from '../models/Product.js';

export const purchaseCart = async (req, res) => {
    const { cid } = req.params;
    const cart = await Cart.findById(cid).populate('products.product');

    if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    let totalAmount = 0;
    const productsNotPurchased = [];

    for (const item of cart.products) {
        const product = item.product;
        if (product.stock >= item.quantity) {
            // Restar el stock del producto
            product.stock -= item.quantity;
            await product.save();

            // Calcular el monto total
            totalAmount += product.price * item.quantity;
        } else {
            // Agregar el producto a la lista de no comprados
            productsNotPurchased.push(product._id);
        }
    }

    // Crear el ticket
    const ticket = new Ticket({
        code: Math.random().toString(36).substring(2, 15), // Código único
        amount: totalAmount,
        purchaser: req.user.email // Correo del usuario
    });

    await ticket.save();

    // Actualizar el carrito con los productos no comprados
    cart.products = cart.products.filter(item => productsNotPurchased.includes(item.product._id));
    await cart.save();

    res.json({ ticket, productsNotPurchased });
};