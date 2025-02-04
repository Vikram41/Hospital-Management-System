//models/Admin.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Admin schema
const adminSchema = new Schema({
  name: {type: String, required: true,},
  email: {type: String, required: true, unique: true,},
  password: {type: String, required: true,},
  role: {type: String, default: 'admin',},
  createdAt: {type: Date, default: Date.now,},
});

// Create the Admin model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
