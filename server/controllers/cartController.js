import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Función auxiliar para calcular el total exacto (Issue #58)
const calculateTotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// 1. Obtener el carrito del usuario
export const getCart = async (req, res) => {
  try {
    const { userId } = req.body; // Puedes cambiarlo a req.user._id si ya usan token de autenticación
    let cart = await Cart.findOne({ user: userId }).populate("items.product", "name image stock");
    
    if (!cart) {
      return res.status(200).json({ message: "El carrito está vacío", items: [], totalAmount: 0 });
    }
    
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el carrito", error });
  }
};

// 2. Agregar productos al carrito (Valida stock y calcula total)
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });

    // Validar stock disponible (Issue #58)
    if (product.stock < quantity) {
      return res.status(400).json({ message: `Stock insuficiente. Solo quedan ${product.stock} unidades.` });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Si el usuario no tiene carrito, se le crea uno nuevo
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity, price: product.price }]
      });
    } else {
      // Si ya tiene carrito, buscamos si el producto ya está adentro
      const itemIndex = cart.items.findIndex(p => p.product.toString() === productId);

      if (itemIndex > -1) {
        // Si el producto existe, sumamos la cantidad y volvemos a validar stock
        const newQuantity = cart.items[itemIndex].quantity + quantity;
        if (product.stock < newQuantity) {
           return res.status(400).json({ message: `No puedes agregar más. El stock máximo es ${product.stock}.` });
        }
        cart.items[itemIndex].quantity = newQuantity;
      } else {
        // Si es un producto nuevo, lo agregamos al arreglo
        cart.items.push({ product: productId, quantity, price: product.price });
      }
    }

    // Calcular el total correctamente (Issue #58)
    cart.totalAmount = calculateTotal(cart.items);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error al agregar al carrito", error });
  }
};

// 3. Actualizar cantidades
export const updateCartItem = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

    const itemIndex = cart.items.findIndex(p => p.product.toString() === productId);
    if (itemIndex === -1) return res.status(404).json({ message: "Producto no encontrado en el carrito" });

    // Validar stock al actualizar (Issue #58)
    const product = await Product.findById(productId);
    if (product.stock < quantity) {
      return res.status(400).json({ message: `Stock insuficiente. El máximo es ${product.stock}.` });
    }

    cart.items[itemIndex].quantity = quantity;
    cart.totalAmount = calculateTotal(cart.items);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el carrito", error });
  }
};

// 4. Eliminar productos del carrito
export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    cart.totalAmount = calculateTotal(cart.items);
    
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar del carrito", error });
  }
};