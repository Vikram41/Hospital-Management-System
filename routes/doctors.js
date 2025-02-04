const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Doctor = require('../models/doctor');
const Appointment = require('../models/appointment');

// Create a new doctor
router.post('/', async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).send(doctor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all doctors
router.get('/', async (req, res) => {
  const { specialty } = req.query;
  if(specialty) {
    try {
      const doctors = await Doctor.find({ specialty: specialty });
      res.status(200).send(doctors);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    try {
      const doctors = await Doctor.find();
      res.status(200).send(doctors);
    } catch (error) {
      res.status(500).send(error);
    }
  }
});

// Fetch all specialties
router.get('/specialties', async (req, res) => {
  try {
    const specialties = await Doctor.distinct('specialty');
    res.status(200).send(specialties);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a single doctor by ID
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).send();
    }
    res.status(200).send(doctor);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a doctor
router.put('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doctor) {
      return res.status(404).send();
    }
    res.status(200).send(doctor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read a doctor appointment by ID
router.get('/:id/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: new mongoose.Types.ObjectId(req.params.id) })
      .populate('patient')
      .populate('doctor')
      .populate('prescription.medicine');
    res.status(200).send(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error); // Log the error to the console
    res.status(500).send({ message: "Failed to fetch appointments", error: error.message });
  }
});

// Delete a doctor
router.delete('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).send();
    }
    res.status(200).send('Doctor deleted');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
