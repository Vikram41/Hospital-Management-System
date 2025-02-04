//models/Doctor.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Doctor schema
const doctorSchema = new Schema({
  name: {type: String, required: true,},
  email: {type: String, required: true, unique: true,},
  password: {type: String, required: true,},
  specialty: {type: String, required: true,},
  phone: {type: String, required: true,},
  createdAt: {type: Date, default: Date.now,},
});

// Create the Doctor model
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
