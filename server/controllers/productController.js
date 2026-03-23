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


export const getProducts = async (req, res) => {
    try {
        const { category, minPrice, maxPrice, vendor, inStock } = req.query;
        
        let query = { isActive: true };

        
        if (category) query.category = category;
        if (vendor) query.vendor = vendor;
        if (inStock === 'true') query.stock = { $gt: 0 };
        
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const productosFiltrados = await Product.find(query);

        res.status(200).json(productosFiltrados);

    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error interno al obtener los productos.' });
    }
};