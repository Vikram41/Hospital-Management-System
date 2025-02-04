//models/Bill.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Bill schema
const billSchema = new Schema({
  appointment: { type: Schema.Types.ObjectId, ref: 'Appointment', required: true },
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  paid: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create the Bill model
const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
