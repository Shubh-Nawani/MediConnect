const express = require('express');
const router = express.Router();
const { bookTest, getBookings, downloadReport, emailReport, sendBookingConfirmation } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');

// Booking routes
router.post('/', authMiddleware, bookTest);
router.get('/:patientId', authMiddleware, getBookings);

// Report routes  
router.get('/report/sample', downloadReport); // Public sample PDF download
router.get('/report/download', authMiddleware, downloadReport); // Protected report download
router.get('/report/download/:bookingId', authMiddleware, downloadReport); // Individual booking report

// Email routes
router.post('/email-report', authMiddleware, emailReport);
router.post('/send-confirmation', authMiddleware, sendBookingConfirmation);

module.exports = router;
