const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  qty: { type: Number, required: true, default: 1 }
});

const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true }
});

const orderSchema = new mongoose.Schema({
  items: { type: [orderItemSchema], required: true },
  address: { type: addressSchema, required: true },
  date: { type: Date, default: Date.now }
}, {
  timestamps: true // optional: adds createdAt & updatedAt
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
