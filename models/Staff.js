//models/Staff.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Staff schema
const staffSchema = new Schema({
  name: {type: String, required: true,},
  email: {type: String, required: true, unique: true,},
  password: {type: String, required: true,},
  position: {type: String, required: true,},
  department: {type: String, required: true,},
  phone: {type: String, required: true,},
  createdAt: {type: Date, default: Date.now,},
});

// Create the Staff model
const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
