//models/Appointment.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Appointment schema
const appointmentSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  appointmentDate: { type: Date, required: true },
  diagnosis: { type: String, default: '' },
  prescription: [{
    medicine: { type: Schema.Types.ObjectId, ref: 'Medicine'},
    quantity: { type: Number }
  }],
  consultationFees: { type: Number, default: 150 },
  createdAt: { type: Date, default: Date.now }
});

// Create the Appointment model
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
