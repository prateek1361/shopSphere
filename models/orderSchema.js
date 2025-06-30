const mongoose = require("mongoose");


const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
});


const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  qty: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],        
  address: addressSchema,          
  date: { type: Date, default: Date.now }, 
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
