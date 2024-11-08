const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/safemax', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
});

// Appointment schema
const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  message: { type: String, default: '' },
  status: { type: String, default: 'Pending' }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// Route to handle form submissions (POST)
app.post('/api/appointments', async (req, res) => {
  try {
    const { name, email, date, time, message } = req.body;

    const existingAppointment = await Appointment.findOne({ email });
    if (existingAppointment) {
      return res.status(400).json({ error: 'This email has already been used for an appointment.' });
    }

    const newAppointment = new Appointment({ name, email, date, time, message });
    await newAppointment.save();

    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to book appointment' });
  }
});

// New route to fetch all appointments (GET)
app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});


app.put('/api/appointments/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).send('Appointment not found');
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).send('Failed to update appointment status');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
