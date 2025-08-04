const mongoose = require('mongoose');

/**
 * Booking Schema for MediConnect
 * Represents patient test bookings and appointments
 */
const bookingSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',           // Reference to Patient model
    required: true,
  },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',             // Reference to Test model
    required: true,
  },
  date: {
    type: Date,
    required: true,          // Appointment date is mandatory
  },
}, {
  timestamps: true,          // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Booking', bookingSchema);
