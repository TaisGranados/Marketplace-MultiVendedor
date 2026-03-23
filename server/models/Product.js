import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    vendor: { type: String },
    image: { type: String },
    stock: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true } // Requerido para listar solo activos
}, {
    timestamps: true
});

export default mongoose.model("Product", productSchema);