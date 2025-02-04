const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Appointment = require('../models/appointment');

// Create a new appointment
router.post('/', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).send(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patient')
      .populate('doctor')
      .populate('prescription.medicine');
    res.status(200).send(appointments);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a single appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient')
      .populate('doctor')
      .populate('prescription.medicine');
    if (!appointment) {
      return res.status(404).send();
    }
    res.status(200).send(appointment);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { diagnosis, prescription } = req.body; // Extract data from the request body

    // Validate that prescription is an array and each item has both medicine and quantity
    if (!diagnosis || !Array.isArray(prescription) || prescription.some(item => !item.medicine || !item.quantity)) {
      return res.status(400).send('Invalid data format');
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { diagnosis, prescription },
      { new: true, runValidators: true }
    )
      .populate('patient')
      .populate('doctor')
      .populate('prescription.medicine');

    if (!updatedAppointment) {
      return res.status(404).send('Appointment not found');
    }

    res.status(200).send(updatedAppointment); // Return the updated appointment
  } catch (error) {
    console.error(error);
    res.status(400).send('Error updating appointment');
  }
});

router.put('/:id/appointment', async (req, res) => {
  try {
    const { appointmentDate, diagnosis } = req.body;

    // Validate that both appointmentDate and diagnosis are provided
    if (!appointmentDate || !diagnosis) {
      return res.status(400).json({ error: 'Appointment Date and Diagnosis are required' });
    }

    // Convert appointmentDate to ISO string (if it's a valid date string)
    const validAppointmentDate = new Date(appointmentDate);
    if (isNaN(validAppointmentDate)) {
      return res.status(400).json({ error: 'Invalid appointment date' });
    }

    // Update the appointment in the database
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { appointmentDate: validAppointmentDate.toISOString(), diagnosis },
      { new: true, runValidators: true }
    )
      .populate('patient')
      .populate('doctor');

    if (!updatedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Return the updated appointment object
    res.status(200).json({ message: 'Appointment updated successfully', updatedAppointment });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating appointment: ' + error.message });
  }
});

// Delete an appointment
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).send();
    }
    res.status(200).send('Appointment deleted');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
