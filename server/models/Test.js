const mongoose = require('mongoose');

/**
 * Test Schema for MediConnect
 * Represents medical lab tests available for booking
 */
const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,           // Test name is mandatory
  },
  description: {
    type: String,            // Optional detailed description
    default: null,
  },
  price: {
    type: Number,
    required: true,          // Price is mandatory for billing
  },
}, {
  timestamps: true,          // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Test', testSchema);
