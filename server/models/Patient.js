const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
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
      return !this.googleId; // Password is required only if no OAuth provider
    },
  },
  // OAuth provider IDs
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple null values
  },
  avatar: {
    type: String,
    default: null,
  },
  provider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  // OAuth access tokens (optional, for API access)
  accessTokens: {
    google: { type: String, default: null },
  },
  // Profile data from OAuth providers
  oauthProfiles: {
    google: { type: Object, default: null },
  },
  // Security
  lastLogin: { type: Date, default: Date.now },
  loginAttempts: { type: Number, default: 0 },
  lockUntil: Date,
}, {
  timestamps: true,
});

// Virtual for account lock status
patientSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Method to increment login attempts
patientSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
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

// Method to reset login attempts
patientSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 }
  });
};

module.exports = mongoose.model('Patient', patientSchema);
