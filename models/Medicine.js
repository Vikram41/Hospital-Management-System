//models/Medicine.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Medicine schema
const medicineSchema = new Schema({
  name: {type: String, required: true,},
  manufacturer: {type: String, required: true,},
  price: {type: Number, required: true,},
  expiryDate: {type: Date, required: true,},
  quantity: {type: Number, required: true,},
  createdAt: {type: Date, default: Date.now,},
});

// Create the Medicine model
const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;
