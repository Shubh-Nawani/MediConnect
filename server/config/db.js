const mongoose = require('mongoose');

/**
 * Global connection cache to prevent multiple connections in serverless environments
 * This ensures connection reuse and prevents connection pool exhaustion
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Establishes or returns cached MongoDB connection
 * Optimized for serverless environments with connection reuse
 */
const connectDB = async () => {
  // Return existing connection if available
  if (cached.conn) {
    console.log('Using existing MongoDB connection');
    return cached.conn;
  }

  // Create new connection promise if none exists
  if (!cached.promise) {
    // MongoDB connection options optimized for production
    const opts = {
      bufferCommands: false,              // Disable mongoose buffering for serverless
      maxPoolSize: 10,                    // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000,     // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000,             // Close sockets after 45 seconds of inactivity
    };

    // Validate that MongoDB URI is configured
    if (!process.env.MONGODB_URI) {
      throw new Error('Please define the MONGODB_URI environment variable');
    }

    console.log('Creating new MongoDB connection...');
    // Create connection promise with error handling
    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB connection succeeded...');
      return mongoose;
    }).catch((err) => {
      console.error('MongoDB connection failed:', err.message);
      cached.promise = null; // Reset promise on failure to allow retry
      throw err;
    });
  }

  try {
    // Wait for connection to be established
    cached.conn = await cached.promise;
  } catch (e) {
    // Reset promise on error to allow retry
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

/**
 * MongoDB connection event handlers
 * These provide logging for connection state changes
 */
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

/**
 * Graceful shutdown handler
 * Closes database connection when application terminates
 */
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed due to app termination');
  process.exit(0);
});

// Export the connection function
module.exports = connectDB;