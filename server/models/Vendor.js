import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  storeName: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "approved", "suspended"],
    default: "pending",
  },

}, {
  timestamps: true,
});

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;

