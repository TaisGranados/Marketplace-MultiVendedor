import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dns from "node:dns/promises";

import conectarDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js"; 
import cartRoutes from "./routes/cartRoutes.js";   
import orderRoutes from "./routes/orderRoutes.js";    

dotenv.config();

await dns.setServers(["1.1.1.1", "8.8.8.8"]);

// ✅ conectar a la DB (usa el archivo externo)
await conectarDB();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ rutas (después de crear app)
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes); 
app.use("/api/cart", cartRoutes);        
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});