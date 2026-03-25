import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product", 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: 1, 
    default: 1 
  },
  price: { 
    type: Number, 
    required: true 
  }
});

const cartSchema = new mongoose.Schema({
  // Asociamos el carrito a un usuario (Issue #58)
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
    unique: true 
  },
  items: [cartItemSchema],
  totalAmount: { 
    type: Number, 
    required: true, 
    default: 0 
  }
}, {
  timestamps: true
});

export default mongoose.model("Cart", cartSchema);