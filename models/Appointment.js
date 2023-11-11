const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: {
    type: [String], // An array of two strings
    required: true,
  },
  doctorName: { type: String, required: true },
  speciality: { type: String, required: true },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
