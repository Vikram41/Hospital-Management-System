const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const Admin = require('./models/admin');
const Staff = require('./models/staff');
const Doctor = require('./models/doctor');
const Patient = require('./models/patient');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/hms');

app.use(bodyParser.json());
app.use(express.static('public'));

const adminRoutes = require('./routes/admins');
app.use('/api/admins', adminRoutes);
app.get('/admins', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'admins.html')); });
app.get('/admins/:id', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'admin.html')); });

const staffRoutes = require('./routes/staffs');
app.use('/api/staffs', staffRoutes);
app.get('/staffs', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'staffs.html')); });
app.get('/staffs/:id', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'staff.html')); });

const doctorRoutes = require('./routes/doctors');
app.use('/api/doctors', doctorRoutes);
app.get('/doctors', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'doctors.html')); });
app.get('/doctors/:id', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'doctor.html')); });

const patientRoutes = require('./routes/patients');
app.use('/api/patients', patientRoutes);
app.get('/patients', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'patients.html')); });
app.get('/patients/:id', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'patient.html')); });

const medicinesRoutes = require('./routes/medicines');
app.use('/api/medicines', medicinesRoutes);
app.get('/medicines', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'medicines.html')); });
app.get('/medicines/:id', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'medicine.html')); });

const appointmentsRoutes = require('./routes/appointments');
app.use('/api/appointments', appointmentsRoutes);
app.get('/appointments', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'appointments.html')); });
app.get('/appointments/:id', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'appointment.html')); });

const billsRoutes = require('./routes/bills');
app.use('/api/bills', billsRoutes);
app.get('/bills', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'bills.html')); });
app.get('/bills/:id', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'bill.html')); });

const roomsRoutes = require('./routes/rooms');
app.use('/api/rooms', roomsRoutes);
app.get('/rooms', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'rooms.html')); });
app.get('/rooms/:id', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'room.html')); });

// POST /login route
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'login.html')); });
app.post('/login', async (req, res) => {
    const { email, password, role } = req.body;

    let UserModel;

    // Determine which model to query based on the role
    switch (role) {
        case 'admin':
            UserModel = Admin;
            break;
        case 'staff':
            UserModel = Staff;
            break;
        case 'patient':
            UserModel = Patient;
            break;
        case 'doctor':
            UserModel = Doctor;
            break;
        default:
            return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    try {
        // Find the user by email in the corresponding model
        const user = await UserModel.findOne({ email });

        if (!user || user.password !== password) {
            // If user is not found or passwords don't match
            return res.status(401).json({ success: false, message: 'Invalid credentials or role' });
        }

        // If credentials are valid, send back success with user ID and role
        res.json({ success: true, id: user._id, role: role });
    } catch (error) {
        // Catch any errors during the process
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
