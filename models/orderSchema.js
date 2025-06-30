const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  name: String,
  price: Number,
  image: String,
  qty: { type: Number, default: 1 }
});

const addressSchema = new mongoose.Schema({
  name: String,
  street: String,
  city: String,
  pincode: String
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  address: addressSchema,
  date: { type: Date, default: Date.now }
}, {
  timestamps: true
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
