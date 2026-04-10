import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// 🛒 CHECKOUT
export const checkout = async (req, res) => {
  try {
    const { userId } = req.body;

    // 1. Buscar carrito
    const cart = await Cart.findOne({ user: userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "El carrito está vacío" });
    }

    // 2. Validar stock nuevamente
    for (const item of cart.items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Stock insuficiente para ${product.name}`
        });
      }
    }

    // 3. Crear orden
    const newOrder = new Order({
      user: userId,
      items: cart.items,
      total: cart.totalAmount,
      status: "created"
    });

    await newOrder.save();

    // 4. Descontar inventario
    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      product.stock -= item.quantity;
      await product.save();
    }

    // 5. Vaciar carrito
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.status(201).json({
      message: "Compra realizada con éxito",
      order: newOrder
    });

  } catch (error) {
    res.status(500).json({
      message: "Error en checkout",
      error: error.message
    });
  }
};

// 📜 HISTORIAL DE ÓRDENES
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener órdenes",
      error: error.message
    });
  }
};

// 🔍 DETALLE DE ORDEN
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId)
      .populate("items.product", "name price image");

    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    res.status(200).json(order);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener la orden",
      error: error.message
    });
  }
};