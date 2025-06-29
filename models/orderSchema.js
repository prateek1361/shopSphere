const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  qty: { type: Number, default: 1 }
});

const addressSchema = new mongoose.Schema({
  name: String,
  street: String,
  city: String,
  state: String,
  pincode: String
});

const orderSchema = new mongoose.Schema({
  
  date: { type: Date, default: Date.now },
  address: addressSchema,
  items: [orderItemSchema],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
