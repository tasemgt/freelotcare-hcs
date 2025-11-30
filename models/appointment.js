const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  consumerName: {
    type: String,
    required: [true, 'Consumer name is required']
  },
  age: {
    type: String,
    required: [true, 'Age is required']
  },
  phone:{
    type: String,
    required: [true, 'Phone number is required']
  },
  email: {
    type: String
  },
  dateOfAppointment: {
    type: Date,
    required: [true, 'A Form must have an appointment date']
  },
  time: {
    type: String,
    required: [true, 'Phone number is required']
  },
  reason: {
    type: String,
    required: [true, 'Appointment Reason is required']
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'ongoing', 'completed'],
    default: 'pending'
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);