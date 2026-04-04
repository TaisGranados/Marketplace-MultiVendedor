import express from "express";
import {
  checkout,
  getUserOrders,
  getOrderById
} from "../controllers/orderController.js";

const router = express.Router();

//  Checkout
router.post("/checkout", checkout);

//  Historial de órdenes
router.post("/my-orders", getUserOrders);

//  Detalle de orden
router.get("/:orderId", getOrderById);

export default router;