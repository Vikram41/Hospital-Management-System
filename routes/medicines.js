const express = require('express');
const router = express.Router();
const Medicine = require('../models/medicine');

// Create a new medicine
router.post('/', async (req, res) => {
  try {
    const medicine = new Medicine(req.body);
    await medicine.save();
    res.status(201).send(medicine);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all medicines
router.get('/', async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.status(200).send(medicines);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a single medicine by ID
router.get('/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).send();
    }
    res.status(200).send(medicine);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a medicine
router.put('/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!medicine) {
      return res.status(404).send();
    }
    res.status(200).send(medicine);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a medicine
router.delete('/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) {
      return res.status(404).send();
    }
    res.status(200).send('Medicine deleted');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
