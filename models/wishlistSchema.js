const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  image: String,
});



const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;