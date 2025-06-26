const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  image: String,
  topDeal: Boolean,
  rating: String,
  description: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;