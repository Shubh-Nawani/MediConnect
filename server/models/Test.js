const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Test', testSchema);
