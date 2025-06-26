const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  orderId: { type: String, required: true, unique: true }, 
  date: { type: Date, default: Date.now },

  address: { type: String, required: true }, 

  items: [
    {
      id: { type: String, required: true },    
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
    }
  ]
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;