const express = require('express');
const router = express.Router();
const Bill = require('../models/bill');
const Appointment = require('../models/appointment');

// Create a new bill
router.post('/', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.body.appointment)
      .populate('patient')
      .populate('doctor')
      .populate('prescription.medicine');

    if (!appointment) {
      return res.status(404).send('Appointment not found');
    }

    const medicineCost = appointment.prescription.reduce((total, item) => total + (item.medicine.price * item.quantity), 0);
    const amount = appointment.consultationFees + medicineCost;

    const bill = new Bill({
      appointment: appointment._id,
      patient: appointment.patient._id,
      doctor: appointment.doctor._id,
      amount,
      paid: false
    });

    await bill.save();
    res.status(201).send(bill);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all bills
router.get('/', async (req, res) => {
  try {
    const bills = await Bill.find()
      .populate('appointment')
      .populate('patient')
      .populate('doctor');

    res.status(200).send(bills);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a single bill by ID
router.get('/:id', async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id)
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

    if (!bill) {
      return res.status(404).send();
    }

    res.status(200).send(bill);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a bill (e.g., mark as paid)
router.put('/:id', async (req, res) => {
  try {
    const bill = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate('appointment')
      .populate('patient')
      .populate('doctor');

    if (!bill) {
      return res.status(404).send();
    }

    res.status(200).send(bill);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a bill
router.delete('/:id', async (req, res) => {
  try {
    const bill = await Bill.findByIdAndDelete(req.params.id);

    if (!bill) {
      return res.status(404).send();
    }

    res.status(200).send('Bill deleted');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
