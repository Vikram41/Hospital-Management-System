const express = require('express');
const router = express.Router();
const Room = require('../models/Room');  // Assuming the Room model is in models/Room.js

// GET all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();  // Find all rooms
    res.json(rooms);  // Respond with the list of rooms
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Error fetching rooms' });
  }
});

// Route to get available rooms
router.get('/available', async (req, res) => {
  try {
    const currentDate = new Date().toISOString();
    console.log(currentDate);

    // Find rooms where no patients have an endDate later than the current date
    const availableRooms = await Room.find({
      'patients': {
        $not: {
          $elemMatch: {
            'scheduleDateTime.endDate': { $gte: currentDate }
          }
        }
      }
    }).exec();
    console.log(availableRooms);

    // Return available rooms
    res.json(availableRooms);
  } catch (error) {
    console.error('Error fetching available rooms:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// GET a single room by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findById(id);  // Find the room by its ID
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);  // Respond with the room data
  } catch (error) {
    console.error('Error fetching room:', error);
    res.status(500).json({ message: 'Error fetching room' });
  }
});

// POST a new room
router.post('/', async (req, res) => {
  const { number, type, price, patients } = req.body;  // Extract data from request body
  try {
    const newRoom = new Room({
      number,
      type,
      price,
      patients,
    });
    await newRoom.save();  // Save the new room to the database
    res.status(201).json(newRoom);  // Respond with the newly created room
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ message: 'Error creating room' });
  }
});

// PUT (update) an existing room by ID
// PUT (update) an existing room by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { number, type, price, patients } = req.body;  // We only need patients data from the body

  try {
    // Find the room by ID
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Update the room fields if provided
    if (number) {
      room.number = number;  // Update the room number
    }
    if (type) {
      room.type = type;  // Update the room type
    }
    if (price) {
      room.price = price;  // Update the room price
    }

    // If patients are provided, update the patients array
    if (patients && Array.isArray(patients)) {
      room.patients.push(...patients); // Append the new patient(s) to the existing array
    }

    // Save the updated room
    const updatedRoom = await room.save();  // Save the room with the updated fields

    res.json(updatedRoom);  // Respond with the updated room
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ message: 'Error updating room' });
  }
});



// DELETE a room by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRoom = await Room.findByIdAndDelete(id);  // Find and delete the room
    if (!deletedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json({ message: 'Room deleted successfully' });  // Respond with a success message
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ message: 'Error deleting room' });
  }
});

module.exports = router;
