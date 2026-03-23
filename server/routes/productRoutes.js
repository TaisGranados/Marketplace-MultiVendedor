
import express from "express";
import { searchProducts } from "../controllers/productController.js";

const router = express.Router();

// Endpoint GET /api/products/search
router.get("/search", searchProducts);

export default router;