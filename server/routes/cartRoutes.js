import express from "express";
import { getCart, addToCart, updateCartItem, removeFromCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/get", getCart); // Usamos POST para enviar el userId en el body por ahora
router.post("/add", addToCart);
router.put("/update", updateCartItem);
router.delete("/remove", removeFromCart); // Importante: enviar el userId y productId en el body

export default router;