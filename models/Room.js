// models/Room.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Room schema
const RoomSchema = new Schema({
  number: {type: String, required: true,},
  type: {type: String, required: true,},
  price: {type: Number, required: true,},
  patients: [{
    patient: { type: Schema.Types.ObjectId, ref: 'Patient',},
    scheduleDateTime: {
      startDate: {type: Date,},
      endDate: {type: Date,}
    }
  }],
  createdAt: {type: Date, default: Date.now,},
});

// Create the Room model
const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
