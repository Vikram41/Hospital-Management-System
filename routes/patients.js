const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Patient = require('../models/patient');
const Appointment = require('../models/appointment');
const Bill = require('../models/bill');

// Create a new patient
router.post('/', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).send(patient);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).send(patients);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a single patient by ID
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).send();
    }
    res.status(200).send(patient);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a patient appointment by ID
router.get('/:id/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: new mongoose.Types.ObjectId(req.params.id) })
      .populate('patient')
      .populate('doctor')
      .populate('prescription.medicine');
    res.status(200).send(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error); // Log the error to the console
    res.status(500).send({ message: "Failed to fetch appointments", error: error.message });
  }
});

// Read a patient bill by ID
router.get('/:id/bills', async (req, res) => {
  try {
    const bills = await Bill.find({ patient: new mongoose.Types.ObjectId(req.params.id) })
      .populate({
        path: 'appointment',
        populate: [
          { path: 'patient' },
          { path: 'doctor' },
          {
            path: 'prescription.medicine',
            model: 'Medicine'
          }
        ]
      })
      .populate('patient')
      .populate('doctor')
      .populate('appointment.prescription.medicine');
    res.status(200).send(bills);
  } catch (error) {
    console.error("Error fetching appointments:", error); // Log the error to the console
    res.status(500).send({ message: "Failed to fetch bills", error: error.message });
  }
});

// Update a patient
router.put('/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!patient) {
      return res.status(404).send();
    }
    res.status(200).send(patient);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a patient
router.delete('/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).send();
    }
    res.status(200).send('Patient deleted');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
