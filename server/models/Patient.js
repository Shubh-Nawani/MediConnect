const mongoose = require('mongoose');

/**
 * Patient Schema for MediConnect
 * Supports both local registration and OAuth authentication
 */
const patientSchema = new mongoose.Schema({
  // Basic patient information
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId; // Password required only for local accounts
    },
  },
  
  // OAuth provider identification
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple null values for unique constraint
  },
  
  // Profile information
  avatar: {
    type: String,
    default: null,
  },
  provider: {
    type: String,
    enum: ['local', 'google'],     // Supported authentication providers
    default: 'local',
  },
  isVerified: {
    type: Boolean,
    default: false,               // Email verification status
  },
  
  // OAuth integration data (optional)
  accessTokens: {
    google: { type: String, default: null },
  },
  oauthProfiles: {
    google: { type: Object, default: null },
  },
  
  // Security and session management
  lastLogin: { type: Date, default: Date.now },
  loginAttempts: { type: Number, default: 0 },
  lockUntil: Date,               // Account lock expiration time
}, {
  timestamps: true,              // Adds createdAt and updatedAt fields
});

/**
 * Virtual property to check if account is currently locked
 */
patientSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

/**
 * Method to increment login attempts and lock account if necessary
 * Implements brute force protection by locking account after 5 failed attempts
 */
patientSchema.methods.incLoginAttempts = function() {
  // Reset attempts if previous lock has expired
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  // Lock account after 5 failed attempts for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
  }
  
  return this.updateOne(updates);
};

/**
 * Method to reset login attempts after successful login
 */
patientSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 }
  });
};

module.exports = mongoose.model('Patient', patientSchema);
