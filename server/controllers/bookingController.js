const Booking = require('../models/Booking');
const Test = require('../models/Test');
const Patient = require('../models/Patient');
const { sendReportEmail, sendNotificationEmail } = require('../utils/emailService');

/**
 * Book a lab test for a patient
 * @route POST /api/bookings
 * @access Private
 */
const bookTest = async (req, res) => {
  try {
    const { testId, date } = req.body;
    
    // Validate required fields
    if (!testId || !date) {
      return res.status(400).json({ message: 'Test ID and date are required' });
    }

    // Validate date is in the future
    const bookingDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (bookingDate < today) {
      return res.status(400).json({ message: 'Booking date must be in the future' });
    }

    // Check if test exists (optional since we're using sample data)
    const test = await Test.findById(testId);
    if (!test) {
      console.log(`Test with ID ${testId} not found in database, proceeding with sample data`);
    }

    // Create new booking with patient ID from authenticated user
    const booking = new Booking({ 
      testId, 
      date: bookingDate, 
      patientId: req.user.id 
    });
    
    await booking.save();
    
    // Populate the test details before sending response
    await booking.populate('testId');
    
    res.status(201).json({
      message: 'Test booked successfully',
      booking
    });
  } catch (err) {
    console.error('Book test error:', err);
    
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        details: err.message 
      });
    }
    
    if (err.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Invalid test ID format' 
      });
    }
    
    res.status(500).json({ 
      message: 'Failed to book test', 
      error: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
};

/**
 * Get all bookings for a specific patient
 * @route GET /api/bookings/:patientId
 * @access Private
 */
const getBookings = async (req, res) => {
  try {
    // Find bookings for patient and populate test details
    const bookings = await Booking.find({ patientId: req.params.patientId }).populate('testId');
    res.json(bookings);
  } catch (err) {
    console.error('Get bookings error:', err);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

/**
 * Download test report (dummy implementation)
 * @route GET /api/bookings/report/download
 * @access Private
 */
const downloadReport = (req, res) => {
  try {
    const path = require('path');
    const filePath = path.join(__dirname, '../public/reports/sample-lab-report.pdf');
    
    // Check if file exists
    const fs = require('fs');
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Report not found' });
    }
    
    // Set appropriate headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="MediConnect-Lab-Report.pdf"');
    
    // Send the file
    res.download(filePath, 'MediConnect-Lab-Report.pdf', (err) => {
      if (err) {
        console.error('Download error:', err);
        if (!res.headersSent) {
          res.status(500).json({ message: 'Failed to download report' });
        }
      }
    });
  } catch (err) {
    console.error('Download report error:', err);
    res.status(500).json({ message: 'Failed to download report' });
  }
};

/**
 * Send report via email
 * @route POST /api/bookings/email-report
 * @access Private
 */
const emailReport = async (req, res) => {
  try {
    const { bookingId, testName } = req.body;
    
    // Get patient info from authenticated user
    const patient = await Patient.findById(req.user.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Path to the sample PDF (in production, this would be the actual patient's report)
    const path = require('path');
    const pdfPath = path.join(__dirname, '../public/reports/sample-lab-report.pdf');
    
    // Check if file exists
    const fs = require('fs');
    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Send email with PDF attachment
    const emailResult = await sendReportEmail(
      patient.email,
      patient.name,
      testName || 'Lab Test Report',
      pdfPath,
      bookingId || 'SAMPLE'
    );

    if (emailResult.success) {
      res.json({ 
        message: 'Report emailed successfully',
        messageId: emailResult.messageId 
      });
    } else {
      res.status(500).json({ 
        message: 'Failed to send email',
        error: emailResult.error 
      });
    }
  } catch (err) {
    console.error('Email report error:', err);
    res.status(500).json({ message: 'Failed to email report' });
  }
};

/**
 * Send test booking confirmation email
 * @route POST /api/bookings/send-confirmation
 * @access Private
 */
const sendBookingConfirmation = async (req, res) => {
  try {
    const { bookingId, testName, date } = req.body;
    
    // Get patient info from authenticated user
    const patient = await Patient.findById(req.user.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const subject = 'Booking Confirmation - Lab Test Scheduled';
    const message = `
      Your lab test has been successfully scheduled!
      
      📋 Test Details:
      • Test Name: ${testName}
      • Booking ID: ${bookingId}
      • Scheduled Date: ${new Date(date).toLocaleDateString()}
      
      📍 Please arrive 15 minutes before your scheduled time and bring a valid photo ID.
      
      We will notify you via email once your test results are ready.
      
      Thank you for choosing MediConnect!
    `;

    const emailResult = await sendNotificationEmail(
      patient.email,
      patient.name,
      subject,
      message
    );

    if (emailResult.success) {
      res.json({ 
        message: 'Confirmation email sent successfully',
        messageId: emailResult.messageId 
      });
    } else {
      res.status(500).json({ 
        message: 'Failed to send confirmation email',
        error: emailResult.error 
      });
    }
  } catch (err) {
    console.error('Send confirmation error:', err);
    res.status(500).json({ message: 'Failed to send confirmation email' });
  }
};

// Export controller functions
module.exports = { bookTest, getBookings, downloadReport, emailReport, sendBookingConfirmation };