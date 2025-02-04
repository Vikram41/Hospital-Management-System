const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');

// Create a new admin
router.post('/', async (req, res) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    res.status(201).send(admin);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all admins
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).send(admins);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a single admin by ID
router.get('/:id', async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).send();
    }
    res.status(200).send(admin);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

// Update an admin
router.put('/:id', async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!admin) {
      return res.status(404).send();
    }
    res.status(200).send(admin);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete an admin
router.delete('/:id', async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).send();
    }
    res.status(200).send('Admin deleted');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
