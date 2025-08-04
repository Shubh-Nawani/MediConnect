const Test = require('../models/Test');

// Fetch all available lab tests
const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllTests };
