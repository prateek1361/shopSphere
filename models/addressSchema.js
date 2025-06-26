const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  userId: { type: String, required: true }, 

  name: { type: String, required: true },  
  street: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true } 
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;