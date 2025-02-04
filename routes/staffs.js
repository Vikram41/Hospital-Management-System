const express = require('express');
const router = express.Router();
const Staff = require('../models/staff');

// Create a new staff member
router.post('/', async (req, res) => {
  try {
    const staff = new Staff(req.body);
    await staff.save();
    res.status(201).send(staff);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all staff members
router.get('/', async (req, res) => {
  try {
    const staffs = await Staff.find();
    res.status(200).send(staffs);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a single staff member by ID
router.get('/:id', async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).send();
    }
    res.status(200).send(staff);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a staff member
router.put('/:id', async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!staff) {
      return res.status(404).send();
    }
    res.status(200).send(staff);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a staff member
router.delete('/:id', async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) {
      return res.status(404).send();
    }
    res.status(200).send('Staff member deleted');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
