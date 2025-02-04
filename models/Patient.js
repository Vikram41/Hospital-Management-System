//models/Patient.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Patient schema
const patientSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  dateOfBirth: {type: Date, required: true},
  phone: {type: String, required: true},
  address: {type: String, required: true},
  medicalHistory: {type: [String]},
  createdAt: {type: Date, default: Date.now},
});

// Create the Patient model
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
