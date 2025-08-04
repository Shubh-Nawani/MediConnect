const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connection succeeded...');
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDB;