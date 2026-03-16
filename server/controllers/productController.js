
import Product from "../models/Product.js";

export const searchProducts = async (req, res) => {
    try {
        const keyword = req.query.q;

        if (!keyword) {
            return res.status(400).json({ 
                message: 'Por favor, proporciona un término de búsqueda en "q".' 
            });
        }

        const productosEncontrados = await Product.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }
            ]
        });

        res.status(200).json(productosEncontrados);

    } catch (error) {
        console.error('Error al buscar productos:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};