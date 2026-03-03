import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "node:dns/promises";
import authRoutes from "./routes/authRoutes.js";


dotenv.config();

await dns.setServers(["1.1.1.1", "8.8.8.8"]);

async function conectarDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a MongoDB ✅");
  } catch (error) {
    console.log("Error de conexión ❌", error);
  }
}

await conectarDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
