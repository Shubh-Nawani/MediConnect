const express = require('express');
const router = express.Router();
const { bookTest, getBookings, downloadReport } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, bookTest);
router.get('/:patientId', authMiddleware, getBookings);
router.get('/report/download', authMiddleware, downloadReport);

module.exports = router;
