import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
      price: Number, // precio en el momento de la compra
    },
  ],

  total: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["created", "paid", "shipped", "delivered"],
    default: "created",
  },

}, {
  timestamps: true,
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
