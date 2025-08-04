const Booking = require('../models/Booking');
const Test = require('../models/Test');

// Book a lab test
const bookTest = async (req, res) => {
  try {
    const booking = new Booking({ ...req.body, patientId: req.user.id });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all bookings for a patient
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ patientId: req.params.patientId }).populate('testId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Download test report (static file for now)
const downloadReport = (req, res) => {
  res.download('./dummy/report.pdf');
};

module.exports = { bookTest, getBookings, downloadReport }